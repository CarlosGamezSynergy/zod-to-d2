import { describe, expect, it } from "vitest";
import { CHILD_ARRAY_PROPERTY_NOTES, CHILD_NUMBER_PROPERTY_NOTES, CHILD_PARENT_NAME_WITH_NOTES_COMMENTS, CHILD_PARENT_ONE_ID_COMMENT, CHILD_PARENT_TWO_ID_COMMENT, childSchema, schemaWithoutMetadata } from "../schema.fixtures";

describe("Notes Tests", () => {
    describe("Metadata", () => {
        it("should have metadata defined", () => {
            expect(childSchema._zod.def.shape.parentOneId.meta()).toBeDefined();
            expect(childSchema._zod.def.shape.parentTwoId.meta()).toBeDefined();
            expect(childSchema._zod.def.shape.parentNameWithNotes.meta()).toBeDefined();
            expect(childSchema._zod.def.shape.numberProperty.meta()).toBeDefined();
            expect(childSchema._zod.def.shape.arrayProperty.element.meta()).toBeDefined();
        });

        it("should not have metadata for schemas without notes", () => {
            expect(schemaWithoutMetadata._zod.def.shape.id.meta()).toBeUndefined();
        });

        it("should have notes metadata", () => {
            expect(childSchema._zod.def.shape.parentOneId.meta()?.notes).toBeDefined();
            expect(childSchema._zod.def.shape.parentTwoId.meta()?.notes).toBeDefined();
            expect(childSchema._zod.def.shape.parentNameWithNotes.meta()?.notes).toBeDefined();
            expect(childSchema._zod.def.shape.numberProperty.meta()?.notes).toBeDefined();
            expect(childSchema._zod.def.shape.arrayProperty.element.meta()?.notes).toBeDefined();
        });

        it("should have correct notes metadata", () => {
            expect(childSchema._zod.def.shape.parentOneId.meta()?.notes).toEqual([CHILD_PARENT_ONE_ID_COMMENT]);
            expect(childSchema._zod.def.shape.parentTwoId.meta()?.notes).toEqual([CHILD_PARENT_TWO_ID_COMMENT]);
            expect(childSchema._zod.def.shape.parentNameWithNotes.meta()?.notes).toEqual(CHILD_PARENT_NAME_WITH_NOTES_COMMENTS);
            expect(childSchema._zod.def.shape.numberProperty.meta()?.notes).toEqual(CHILD_NUMBER_PROPERTY_NOTES);
            expect(childSchema._zod.def.shape.arrayProperty.element.meta()?.notes).toEqual(CHILD_ARRAY_PROPERTY_NOTES);
        });
    });
});
