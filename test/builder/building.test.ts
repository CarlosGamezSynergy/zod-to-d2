import { describe, it } from "vitest";
import { buildDiagram } from "../../src/builder/buildDiagram";
import { buildRelationship } from "../../src/builder/buildRelationship";
import { buildTable } from "../../src/builder/buildTable";
import { parseProperties } from "../../src/parser/parseProperties";
import { parseRelationships } from "../../src/parser/parseRelationships";
import { CHILD_TABLE_NAME, childSchema, PARENT_ONE_TABLE_NAME, PARENT_TWO_TABLE_NAME, parentOneSchema, parentTwoSchema } from "../schema.fixtures";

describe("Building Tests", () => {
    it("should parse a simple expression", () => {
        const childTable = buildTable(CHILD_TABLE_NAME, parseProperties(childSchema));
        const parentOneTable = buildTable(PARENT_ONE_TABLE_NAME, parseProperties(parentOneSchema));
        const parentTwoTable = buildTable(PARENT_TWO_TABLE_NAME, parseProperties(parentTwoSchema));
        const childRelationships = parseRelationships(childSchema).map(buildRelationship);
        const parentOneRelationships = parseRelationships(parentOneSchema).map(buildRelationship);
        const parentTwoRelationships = parseRelationships(parentTwoSchema).map(buildRelationship);

        console.log(buildDiagram("Test Diagram", [childTable, parentOneTable, parentTwoTable, ...childRelationships, ...parentOneRelationships, ...parentTwoRelationships]));
    });
});
