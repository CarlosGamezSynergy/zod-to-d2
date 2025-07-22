import { describe, expect, it } from "vitest";
import { childSchema, parentOneSchema, parentTwoSchema, schemaWithoutMetadata } from "../schema.fixtures";

describe("Primary Key Tests", () => {
    describe("Metadata", () => {
        it("should have metadata defined", () => {
            expect(parentOneSchema._zod.def.shape.id.meta()).toBeDefined();
            expect(parentTwoSchema._zod.def.shape.id.meta()).toBeDefined();
            expect(childSchema._zod.def.shape.id.meta()).toBeDefined();
        });

        it("should not have metadata for schemas without primaryKey", () => {
            expect(schemaWithoutMetadata._zod.def.shape.id.meta()).toBeUndefined();
        });

        it("should have primaryKey metadata", () => {
            expect(parentOneSchema._zod.def.shape.id.meta()?.primaryKey).toBeDefined();
            expect(parentTwoSchema._zod.def.shape.id.meta()?.primaryKey).toBeDefined();
            expect(childSchema._zod.def.shape.id.meta()?.primaryKey).toBeDefined();
        });

        it("should have correct primaryKey metadata", () => {
            expect(parentOneSchema._zod.def.shape.id.meta()?.primaryKey).toEqual({ type: 'ZodPrimaryKey' });
            expect(parentTwoSchema._zod.def.shape.id.meta()?.primaryKey).toEqual({ type: 'ZodPrimaryKey' });
            expect(childSchema._zod.def.shape.id.meta()?.primaryKey).toEqual({ type: 'ZodPrimaryKey' });
        });
    });
});