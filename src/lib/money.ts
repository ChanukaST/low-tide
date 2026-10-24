const lkrFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formats integer LKR minor units (cents) for display.
 * All prices in the application remain integers until presentation.
 */
export function formatLKR(cents: number): string {
  if (!Number.isSafeInteger(cents)) {
    throw new TypeError("LKR amounts must be integer minor units.");
  }

  return lkrFormatter.format(cents / 100);
}
