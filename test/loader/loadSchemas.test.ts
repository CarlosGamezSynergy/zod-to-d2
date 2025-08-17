import { describe, expect, it } from "vitest";
import { loadZodSchemas } from "../../src/loader/loadZodSchemas.js";
import { LoadedZodSchema } from "../../src/types/LoadedZodSchema.type.js";

describe("loadSchemas", () => {
  it("should load Zod schemas from a valid filePath", async () => {
    const loadedSchemas = await loadZodSchemas("./test/schema.fixtures.ts");
    console.log(loadedSchemas);
    const allSuccess = loadedSchemas.every(
      (schema) => schema.type === "LoadedZodSchemaSuccess"
    );
    expect(allSuccess).toBe(true);
    expect(loadedSchemas).toBeDefined();
    expect(loadedSchemas.length).toBeGreaterThan(0);
    expect(loadedSchemas).toBeInstanceOf(Array<LoadedZodSchema>);
  });

  it("should return an error for an invalid filePath", async () => {
    const loadedSchemas = await loadZodSchemas("./invalid/path.ts");
    const hasError = loadedSchemas.some(
      (schema) => schema.type === "LoadedZodSchemaError"
    );
    expect(hasError).toBe(true);
    expect(loadedSchemas).toBeInstanceOf(Array<LoadedZodSchema>);
  });
});
