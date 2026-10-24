import { describe, expect, it } from "vitest";

import { formatLKR } from "@/lib/money";

describe("formatLKR", () => {
  it("formats integer minor units as whole LKR", () => {
    expect(formatLKR(590_000).replace(/\u00a0/g, " ")).toBe("LKR 5,900");
    expect(formatLKR(0).replace(/\u00a0/g, " ")).toBe("LKR 0");
  });

  it("rejects non-integer minor units", () => {
    expect(() => formatLKR(12.5)).toThrow(TypeError);
    expect(() => formatLKR(Number.NaN)).toThrow(TypeError);
  });
});
