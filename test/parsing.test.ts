import "src/extensions/foreignKey";
import { describe, it } from "vitest";
import z from "zod";
import { inferSchema } from "../src/parser/inferSchema";

describe("Parsing Tests", () => {
  const parentSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
  });

  const childSchema = z.object({
    id: z.string(),
    parentId: z.string().foreignKey(parentSchema, "id"),
  });

  it("should parse a simple expression", () => {
    // const meta = getForeignKeyFromMeta(childSchema.shape.parentId);
    // console.log(meta);
    inferSchema(childSchema);
  });
});
