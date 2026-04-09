import { describe, it, expect } from "vitest";
import { formatCurrency, convertIDR } from "../currency";

describe("currency utils", () => {
  it("formatCurrency should format number to IDR", () => {
    const result = formatCurrency(50000);
    expect(result).toContain("50.000");
  });

  it("convertIDR should be the same as formatCurrency", () => {
    expect(formatCurrency).toBe(convertIDR);
  });

  it("should handle zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("0");
  });
});
