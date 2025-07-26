import { describe, expect, it } from "vitest";
import { CHILD_TABLE_NAME, childSchema, PARENT_ONE_TABLE_NAME, PARENT_TWO_TABLE_NAME, parentOneSchema, parentTwoSchema, schemaWithoutMetadata } from "../schema.fixtures";

describe("tableName Tests", () => {
    describe("Metadata", () => {
        it("should have metadata defined", () => {
            expect(parentOneSchema.meta()).toBeDefined();
            expect(parentTwoSchema.meta()).toBeDefined();
            expect(childSchema.meta()).toBeDefined();
        });

        it("should not have metadata for schemas without tableName", () => {
            expect(schemaWithoutMetadata.meta()).toBeUndefined();
        });

        it("should have tableName metadata", () => {
            expect(parentOneSchema.meta()?.tableName).toBeDefined();
            expect(parentTwoSchema.meta()?.tableName).toBeDefined();
            expect(childSchema.meta()?.tableName).toBeDefined();
        });

        it("should have correct tableName metadata", () => {
            expect(parentOneSchema.meta()?.tableName).toBe(PARENT_ONE_TABLE_NAME);
            expect(parentTwoSchema.meta()?.tableName).toBe(PARENT_TWO_TABLE_NAME);
            expect(childSchema.meta()?.tableName).toBe(CHILD_TABLE_NAME);
        });
    });
});