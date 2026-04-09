import { describe, it, expect } from "vitest";
import endpoint from "../endpoint.constant";

describe("endpoint constants", () => {
  it("should have all required endpoints", () => {
    expect(endpoint.AUTH).toBe("/auth");
    expect(endpoint.GENRES).toBe("/genres");
    expect(endpoint.MOVIES).toBe("/movies");
    expect(endpoint.THEATERS).toBe("/theaters");
    expect(endpoint.SHOWTIMES).toBe("/showtimes");
    expect(endpoint.RESERVATIONS).toBe("/reservations");
    expect(endpoint.ADMIN).toBe("/admin");
  });
});
