import fs from "node:fs";
import path from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const screenshotsDir = path.join("screenshots", "phase-1");

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function settlePage(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(320, Math.round(window.innerHeight * 0.75));

    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }

    window.scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );
  });

  await page.waitForTimeout(250);
}

async function getSeriousViolations(page: Page, include?: string) {
  let builder = new AxeBuilder({ page });
  if (include) {
    builder = builder.include(include);
  }

  const results = await builder.analyze();
  return results.violations
    .filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    )
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      targets: violation.nodes.map((node) => node.target),
    }));
}

test.describe("Phase 1 storefront", () => {
  test.beforeEach(async ({ page }) => {
    fs.mkdirSync(screenshotsDir, { recursive: true });
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

      const overflow = await page.evaluate(
        () =>
          Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
          ) - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      await page.screenshot({
        path: path.join(screenshotsDir, `${viewport.name}.png`),
        fullPage: true,
        animations: "disabled",
      });
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

      const overflow = await page.evaluate(
        () =>
          Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
          ) - window.innerWidth,
      );
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
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
    await expect(dialog.getByRole("link", { name: /the drop/i })).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotsDir, "mobile-menu.png"),
      animations: "disabled",
    });

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

  test("desktop navigation is available and the mobile trigger is hidden", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(primaryNav).toBeVisible();
    await expect(
      primaryNav.getByRole("link", { name: "New arrivals" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();

    await primaryNav.getByRole("link", { name: "New arrivals" }).click();
    await expect(page).toHaveURL(/#new-arrivals$/);
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
