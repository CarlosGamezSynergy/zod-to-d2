import { describe, expect, it } from "vitest";
import { parseRelationships } from "../../src/parser/parseRelationships";
import { childSchema } from "../schema.fixtures";

describe("Relationships Parsing Tests", () => {
    describe("Basic Relationships Parsing", () => {
        it("should parse relationships correctly", () => {
            const relationships = parseRelationships(childSchema);
            expect(relationships).toEqual([
                {
                    localProperty: 'child_table.parentOneId',
                    foreignEntity: 'parent_one_table',
                    foreignEntityProperty: 'id'
                },
                {
                    localProperty: 'child_table.parentTwoId',
                    foreignEntity: 'parent_two_table',
                    foreignEntityProperty: 'id'
                }
            ]);
        });
    });
});
