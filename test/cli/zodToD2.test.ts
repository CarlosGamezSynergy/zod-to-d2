import { describe, it } from "vitest";
import { zodToD2 } from "../../src/cli/zodToD2";

describe("ZodToD2 Tests", () => {
    it("should generate D2 file from single input file", async () => {
        await zodToD2({ filePaths: ["./test/schema.fixtures.ts"], title: "Test Diagram" });
    });
});