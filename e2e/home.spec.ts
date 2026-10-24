import { expect, test } from "@playwright/test";

import {
  captureFullPage,
  captureViewport,
  expectNoHorizontalOverflow,
  getSeriousViolations,
  settlePage,
  viewports,
} from "./helpers";

test.describe("Homepage storefront", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const viewport of viewports) {
    test(`renders ${viewport.name} layout without horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");
      await settlePage(page);

      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /move like water/i,
        }),
      ).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expectNoHorizontalOverflow(page, viewport.name);

      await captureFullPage(page, viewport.name);
    });
  }

  test("renders narrow mobile widths without horizontal overflow", async ({
    page,
  }) => {
    for (const width of [360, 320]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: /move like water/i,
        }),
      ).toBeVisible();
      await expectNoHorizontalOverflow(page, `${width}px`);
    }
  });

  test("skip link is the first keyboard stop and focuses main content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
  });

  test("mobile navigation opens with keyboard, keeps focus inside, and closes with Escape", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Open menu" });
    await expect(trigger).toBeVisible();
    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Tees" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Fleece" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Search" })).toBeVisible();

    await captureViewport(page, "mobile-menu");

    await page.keyboard.press("Tab");
    const focusIsInsideDialog = await page.evaluate(
      () => document.activeElement?.closest('[role="dialog"]') !== null,
    );
    expect(focusIsInsideDialog).toBe(true);
    expect(await getSeriousViolations(page, '[role="dialog"]')).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("desktop navigation routes to the catalogue without overlap at 1024px", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    const searchLink = page.getByRole("link", { name: "Search products" });
    const navBox = await primaryNav.boundingBox();
    const searchBox = await searchLink.boundingBox();

    await expect(primaryNav).toBeVisible();
    await expect(searchLink).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    expect(navBox).not.toBeNull();
    expect(searchBox).not.toBeNull();

    if (navBox && searchBox) {
      expect(navBox.x + navBox.width).toBeLessThanOrEqual(searchBox.x - 8);
    }

    await primaryNav.getByRole("link", { name: "New arrivals" }).click();
    await expect(page).toHaveURL(/\/collections\/first-studies$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /first studies/i }),
    ).toBeVisible();
  });

  test("search icon in the header opens the search page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("link", { name: "Search products" }).click();
    await expect(page).toHaveURL(/\/search$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /search the study/i }),
    ).toBeVisible();
  });

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ] as const) {
    test(`has no critical or serious accessibility violations at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");
      await settlePage(page);

      expect(await getSeriousViolations(page)).toEqual([]);
    });
  }
});
