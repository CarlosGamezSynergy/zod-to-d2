import { describe, expect, it } from "vitest";
import { childSchema, parentOneSchema, parentTwoSchema } from "../schema.fixtures";

describe("Foreign Key Tests", () => {
  describe("Metadata", () => {
    it("should have metadata defined for foreign keys", () => {
      expect(childSchema._zod.def.shape.parentOneId.meta()).toBeDefined();
      expect(childSchema._zod.def.shape.parentTwoId.meta()).toBeDefined();
    });

    it("should have foreignKey metadata", () => {
      expect(childSchema._zod.def.shape.parentOneId.meta()?.foreignKey).toBeDefined();
      expect(childSchema._zod.def.shape.parentTwoId.meta()?.foreignKey).toBeDefined();
    });

    it("should have correct foreignKey metadata", () => {
      expect(childSchema._zod.def.shape.parentOneId.meta()?.foreignKey).toEqual({
        type: 'ZodForeignKey',
        foreignSchema: parentOneSchema,
        foreignProperty: 'id'
      });
      expect(childSchema._zod.def.shape.parentTwoId.meta()?.foreignKey).toEqual({
        type: 'ZodForeignKey',
        foreignSchema: parentTwoSchema,
        foreignProperty: 'id'
      });
    });
  });
});


