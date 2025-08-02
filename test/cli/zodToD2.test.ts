import { describe, it } from "vitest";
import { zodToD2 } from "../../src/cli/zodToD2";

describe("ZodToD2 Tests", () => {
  it("should generate D2 file from single input file", async () => {
    await zodToD2({
      title: "Test Diagram",
      outputPath: "./test-diagram.d2",
      source: "filePaths",
      filePaths: ["./test/schema.fixtures.ts"],
    });
  });
});
