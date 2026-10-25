import { expect, test, type Page } from "@playwright/test";

import {
  captureFullPage,
  expectNoHorizontalOverflow,
  getSeriousViolations,
  settlePage,
} from "./helpers";

function bagLink(page: Page) {
  return page.getByRole("link", { name: /Shopping bag:/i });
}

async function addHoodieToBag(
  page: Page,
  options: { color?: "Ink" | "Stone"; size?: string } = {},
) {
  const { color = "Ink", size = "M" } = options;

  await page.goto("/products/core-hoodie");
  if (color !== "Ink") {
    await page.getByRole("button", { name: color, exact: true }).click();
  }
  await page.getByRole("button", { name: `Size ${size}`, exact: true }).click();

  const addButton = page.getByRole("button", {
    name: "Add to bag",
    exact: true,
  });
  await expect(addButton).toBeEnabled();
  await addButton.click();
  await expect(
    page.getByRole("status").filter({ hasText: "Added Core Hoodie" }),
  ).toContainText("to bag");
}

test.describe("Phase 3 cart", () => {
  test("adds a selected variant and restores it after a reload", async ({
    page,
  }) => {
    await addHoodieToBag(page);
    await expect(bagLink(page)).toContainText("(1)");

    await page.reload();
    await expect(bagLink(page)).toContainText("(1)");

    await bagLink(page).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByTestId("cart-line")).toHaveCount(1);
    await expect(page.getByTestId("cart-line")).toContainText("Core Hoodie");
    await expect(page.getByTestId("cart-line")).toContainText("Ink / M");
    await expect(page.getByTestId("cart-quantity")).toHaveAttribute(
      "data-quantity",
      "1",
    );
    await expect(page.getByTestId("cart-subtotal")).toContainText("11,900");
    await expect(page.getByTestId("cart-total")).toContainText("11,900");

    await page.reload();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);
    await expect(bagLink(page)).toContainText("(1)");
  });

  test("changes quantities, updates totals, and removes a line", async ({
    page,
  }) => {
    await addHoodieToBag(page);
    await bagLink(page).click();

    const quantity = page.getByTestId("cart-quantity");
    await expect(quantity).toHaveAttribute("data-quantity", "1");

    await page
      .getByRole("button", {
        name: /Increase quantity for Core Hoodie, Ink, M/i,
      })
      .click();
    await expect(quantity).toHaveAttribute("data-quantity", "2");
    await expect(page.getByTestId("cart-line-total")).toContainText("23,800");
    await expect(page.getByTestId("cart-subtotal")).toContainText("23,800");
    await expect(page.getByTestId("cart-total")).toContainText("23,800");
    await expect(bagLink(page)).toContainText("(2)");

    await page
      .getByRole("button", {
        name: /Decrease quantity for Core Hoodie, Ink, M/i,
      })
      .click();
    await expect(quantity).toHaveAttribute("data-quantity", "1");
    await expect(page.getByTestId("cart-subtotal")).toContainText("11,900");

    await page
      .getByRole("button", {
        name: /Remove Core Hoodie, Ink, M from bag/i,
      })
      .click();
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await expect(bagLink(page)).toContainText("(0)");
    await expect(
      page.getByRole("link", { name: /Proceed to checkout/i }),
    ).toHaveCount(0);
  });

  test("keeps different colourways as separate cart lines", async ({
    page,
  }) => {
    await addHoodieToBag(page, { color: "Ink", size: "M" });
    await addHoodieToBag(page, { color: "Stone", size: "M" });
    await bagLink(page).click();

    const lines = page.getByTestId("cart-line");
    await expect(lines).toHaveCount(2);
    await expect(lines.filter({ hasText: "Ink / M" })).toHaveCount(1);
    await expect(lines.filter({ hasText: "Stone / M" })).toHaveCount(1);
    await expect(bagLink(page)).toContainText("(2)");
    await expect(page.getByTestId("cart-subtotal")).toContainText("23,800");
  });

  test("shows the empty state and navigates to the checkout placeholder", async ({
    page,
  }) => {
    await page.goto("/cart");
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await expect(bagLink(page)).toContainText("(0)");
    await expect(
      page.getByRole("link", { name: /Proceed to checkout/i }),
    ).toHaveCount(0);

    await addHoodieToBag(page);
    await bagLink(page).click();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);

    await page.getByRole("link", { name: /Proceed to checkout/i }).click();
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkout/i }),
    ).toBeVisible();
    await expect(page.getByText(/No order/i).first()).toBeVisible();
    await expect(page.getByText(/Phase 5/).first()).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Place order|Pay now/i }),
    ).toHaveCount(0);
  });

  test("cart and checkout remain usable at narrow widths", async ({ page }) => {
    await addHoodieToBag(page);
    await bagLink(page).click();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);

    for (const [width, height] of [
      [1024, 900],
      [768, 1024],
      [390, 844],
      [360, 800],
      [320, 800],
    ] as const) {
      await page.setViewportSize({ width, height });
      await expect(page.getByTestId("cart-line")).toHaveCount(1);
      await expectNoHorizontalOverflow(page, `cart at ${width}px`);
    }

    await page.setViewportSize({ width: 320, height: 800 });
    await page.getByRole("link", { name: /Proceed to checkout/i }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkout/i }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page, "checkout at 320px");
  });

  test("cart, empty state, and checkout have no serious accessibility violations", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cart");
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await settlePage(page);
    expect(
      await getSeriousViolations(page),
      "accessibility violations on the empty cart",
    ).toEqual([]);

    await addHoodieToBag(page);
    await bagLink(page).click();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);
    await settlePage(page);
    expect(
      await getSeriousViolations(page),
      "accessibility violations on the cart with an item",
    ).toEqual([]);

    await page.getByRole("link", { name: /Proceed to checkout/i }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkout/i }),
    ).toBeVisible();
    await settlePage(page);
    expect(
      await getSeriousViolations(page),
      "accessibility violations on the checkout placeholder",
    ).toEqual([]);
  });

  test("captures Phase 3 cart and checkout review screenshots", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cart");
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await captureFullPage(page, "cart-empty-desktop");

    await addHoodieToBag(page);
    await bagLink(page).click();
    await expect(page.getByTestId("cart-line")).toHaveCount(1);
    await captureFullPage(page, "cart-desktop");

    await page.setViewportSize({ width: 390, height: 844 });
    await captureFullPage(page, "cart-mobile");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("link", { name: /Proceed to checkout/i }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /Checkout/i }),
    ).toBeVisible();
    await captureFullPage(page, "checkout-desktop");
  });
});
