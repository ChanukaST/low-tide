import { expect, test } from "@playwright/test";

import {
  captureFullPage,
  expectNoHorizontalOverflow,
  getSeriousViolations,
  settlePage,
} from "./helpers";

const productCards = '[data-testid="product-card"]';

test.describe("Catalogue and product experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("homepage product link opens the product page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await page
      .locator('[data-product-slug="essential-oversized-tee"]')
      .getByRole("link")
      .click();

    await expect(page).toHaveURL(/\/products\/essential-oversized-tee$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /essential oversized tee/i,
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("group", { name: "Essential Oversized Tee images" })
        .getByRole("button"),
    ).toHaveCount(3);
  });

  test("collection filters, sorting, availability and empty state work", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/collections/first-studies");

    await expect(page.locator(productCards)).toHaveCount(5);

    await page.getByRole("link", { name: "Filter by size M" }).click();
    await expect(page).toHaveURL(/size=M/);
    await expect(page.locator(productCards)).toHaveCount(3);

    await page
      .getByRole("link", { name: "Filter by colour Washed black" })
      .click();
    await expect(page).toHaveURL(/size=M/);
    await expect(page).toHaveURL(/color=washed-black/);
    await expect(page.locator(productCards)).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 2, name: /graphic tee/i }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Clear all" }).click();
    await expect(page).toHaveURL(/\/collections\/first-studies$/);
    await expect(page.locator(productCards)).toHaveCount(5);

    await page
      .getByRole("link", { name: /Price ↑, sort by price: low to high/i })
      .click();
    await expect(page).toHaveURL(/sort=price-asc/);

    const slugs = await page
      .locator("[data-product-slug]")
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-product-slug")),
      );

    expect(slugs).toEqual([
      "everyday-streetwear-cap",
      "essential-oversized-tee",
      "heavyweight-graphic-tee",
      "relaxed-fit-sweatshirt",
      "core-hoodie",
    ]);

    await page.goto("/collections/first-studies?availability=in-stock");
    await expect(page.locator(productCards)).toHaveCount(4);
    await expect(
      page.locator('[data-product-slug="relaxed-fit-sweatshirt"]'),
    ).toHaveCount(0);

    await page.goto("/collections/tees?size=L&color=washed-black");
    await expect(page.getByText(/no pieces/i).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Clear all filters" }),
    ).toBeVisible();
  });

  test("variant selection shows stock states and sold-out options", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/products/core-hoodie");

    const status = page.getByTestId("variant-stock-status");

    await expect(
      page.getByRole("button", { name: "Select a size" }),
    ).toBeDisabled();
    await expect(status).toContainText("Select a size");

    await page.getByRole("button", { name: "Size S", exact: true }).click();
    await expect(status).toContainText("Only 1 left");
    await expect(page.getByText("LT-HOO-COR-INK-S")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add to bag" }),
    ).toBeEnabled();

    await page.getByRole("button", { name: "Stone", exact: true }).click();
    await expect(status).toContainText("Select a size");
    await expect(
      page.getByRole("button", { name: "Size S, sold out" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Size L, sold out" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Size XL, sold out" }),
    ).toBeDisabled();

    await page.getByRole("button", { name: "Size M", exact: true }).click();
    await expect(status).toContainText("Only 2 left");
    await expect(page.getByText("LT-HOO-COR-STO-M")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add to bag" }),
    ).toBeEnabled();
  });

  test("gallery thumbnails change the active product study", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/products/core-hoodie");

    const gallery = page.getByTestId("product-gallery");
    await expect(gallery).toHaveAttribute(
      "data-gallery-image",
      "core-hoodie-front",
    );

    const detailButton = page.getByRole("button", {
      name: /Hood detail/i,
    });
    await detailButton.click();
    await expect(detailButton).toHaveAttribute("aria-pressed", "true");
    await expect(gallery).toHaveAttribute(
      "data-gallery-image",
      "core-hoodie-detail",
    );

    const colourButton = page.getByRole("button", {
      name: /Stone study/i,
    });
    await colourButton.click();
    await expect(colourButton).toHaveAttribute("aria-pressed", "true");
    await expect(gallery).toHaveAttribute(
      "data-gallery-image",
      "core-hoodie-stone",
    );
  });

  test("a fully sold-out demo product cannot be selected", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/products/relaxed-fit-sweatshirt");

    await expect(
      page.getByRole("button", { name: "Sold out", exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Undyed, sold out" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Size M, sold out" }),
    ).toBeDisabled();
    await expect(page.getByRole("status")).toContainText("sold out");
  });

  test("product size guide link deep-links into the fleece tables", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/products/core-hoodie");

    await page.getByRole("link", { name: "Size guide" }).first().click();
    await expect(page).toHaveURL(/\/size-guide#fleece$/);
    await expect(
      page.getByRole("heading", { level: 2, name: /fleece/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Fleece measurements" }),
    ).toBeVisible();
  });

  test("search finds products and handles empty results", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/search");

    await expect(
      page.getByRole("heading", { level: 1, name: /search the study/i }),
    ).toBeVisible();

    const input = page.getByRole("searchbox", {
      name: "Search the catalogue",
    });
    await input.fill("hoodie");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/\/search\?q=hoodie$/);
    await expect(
      page.getByRole("heading", { level: 2, name: /hoodie/i }),
    ).toBeVisible();
    await expect(page.locator(productCards)).toHaveCount(2);
    await expect(page.getByRole("status")).toContainText("02 pieces found");

    await input.fill("zzzz");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page).toHaveURL(/\/search\?q=zzzz$/);
    await expect(page.getByText(/No match/).first()).toBeVisible();
    await expect(
      page.getByRole("status").filter({ hasText: "00 pieces found" }),
    ).toBeVisible();
  });

  test("catalogue pages render at mobile and tablet widths without overflow", async ({
    page,
  }) => {
    const pages = [
      ["collection", "/collections/first-studies"],
      ["product", "/products/core-hoodie"],
      ["search", "/search?q=hoodie"],
      ["size-guide", "/size-guide"],
    ] as const;

    for (const [name, path] of pages) {
      for (const [width, height] of [
        [1024, 900],
        [768, 1024],
        [390, 844],
        [360, 800],
        [320, 800],
      ] as const) {
        await page.setViewportSize({ width, height });
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expectNoHorizontalOverflow(page, `${name} at ${width}px`);
      }
    }
  });

  test("new catalogue pages have no critical or serious accessibility violations", async ({
    page,
  }) => {
    const pages = [
      "/collections/first-studies",
      "/collections/tees?size=L&color=washed-black",
      "/products/core-hoodie",
      "/products/relaxed-fit-sweatshirt",
      "/search?q=hoodie",
      "/search",
      "/size-guide",
    ];

    for (const path of pages) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      await settlePage(page);
      expect(
        await getSeriousViolations(page),
        `accessibility violations on ${path}`,
      ).toEqual([]);
    }
  });

  test("captures catalogue and search review screenshots", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/collections/first-studies");
    await captureFullPage(page, "collection-desktop");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/collections/first-studies");
    await captureFullPage(page, "collection-mobile");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/collections/tees");
    await captureFullPage(page, "collection-tees-desktop");

    await page.goto("/products/core-hoodie");
    await captureFullPage(page, "product-desktop");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/products/core-hoodie");
    await captureFullPage(page, "product-mobile");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/search?q=hoodie");
    await captureFullPage(page, "search-desktop");

    await page.goto("/search");
    await captureFullPage(page, "search-start-desktop");

    await page.goto("/size-guide");
    await captureFullPage(page, "size-guide-desktop");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/size-guide");
    await captureFullPage(page, "size-guide-mobile");
  });
});
