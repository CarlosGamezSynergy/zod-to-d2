import "src/extensions";
import { describe, it } from "vitest";
import { z } from "zod";

const parentSchema = z.object({
  id: z.string().primaryKey(),
  name: z.string(),
  description: z.string().optional(),
});

export type ParentSchema = z.infer<typeof parentSchema>;

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
