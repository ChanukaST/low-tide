import fs from "node:fs";
import path from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export const screenshotsDir = path.join("screenshots", "phase-3");

export const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

export async function settlePage(page: Page) {
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

  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  await page.waitForTimeout(250);
}

export async function getSeriousViolations(page: Page, include?: string) {
  const builder = new AxeBuilder({ page });
  if (include) {
    builder.include(include);
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

export async function expectNoHorizontalOverflow(page: Page, label?: string) {
  const overflow = await page.evaluate(
    () =>
      Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      ) - window.innerWidth,
  );

  expect(
    overflow,
    label ? `overflow at ${label}` : undefined,
  ).toBeLessThanOrEqual(1);
}

export async function captureFullPage(page: Page, name: string) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  await settlePage(page);
  await page.screenshot({
    path: path.join(screenshotsDir, `${name}.png`),
    fullPage: true,
    animations: "disabled",
  });
}

export async function captureViewport(page: Page, name: string) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotsDir, `${name}.png`),
    animations: "disabled",
  });
}
