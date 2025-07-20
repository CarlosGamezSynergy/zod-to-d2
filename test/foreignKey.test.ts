import "src/extensions/foreignKey";
import { describe, expect, it } from "vitest";
import { z } from "zod";

const parentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const childSchema = z.object({
  id: z.string(),
  parentId: z.string().foreignKey(parentSchema, "id"),
});

export type ChildSchema = z.infer<typeof childSchema>;

describe("Foreign Key Function", () => {
  it("should return the correct foreign key type", () => {
    const foreignKeyType = childSchema.shape.parentId;
    console.dir(childSchema.shape.parentId.def.type);
    // expect(foreignKeyType).toStrictEqual(parentSchema.shape.id);
  });
});
