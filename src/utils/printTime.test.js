import { describe, expect, it } from "@jest/globals";
import { printTime } from "./printTime";
import "@testing-library/jest-dom";

describe("Printing time on screen", () => {
  it("should display initial time", () => {
    expect(printTime(0)).toBe("00:00.00");
  });

  it("should convert ms to string format", () => {
    expect(printTime(6666)).toBe("00:06.66");
  });
});
