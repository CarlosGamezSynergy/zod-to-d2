import { describe, expect, it } from "vitest";
import { scanDirectory } from "../../src/loader";

describe("scanDirectory", () => {
    it("should return an array of file paths in the directory", async () => {
        const directory = "./dist";
        const result = await scanDirectory(directory);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    it("should handle errors gracefully and return an empty array", async () => {
        const directory = "./nonexistent-directory";
        const result = await scanDirectory(directory);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
    });
});