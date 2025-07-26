import { describe, it } from "vitest";
import {
    buildDiagram,
    buildRelationship,
    buildTable,
    generateDiagramText,
    parseProperties,
    parseRelationships,
} from "../../src";
import { postSchema, userSchema } from "../sample.schemas";
import {
    CHILD_TABLE_NAME,
    childSchema,
    PARENT_ONE_TABLE_NAME,
    PARENT_TWO_TABLE_NAME,
    parentOneSchema,
    parentTwoSchema,
} from "../schema.fixtures";

describe("Building Tests", () => {
  it("should parse a simple expression", () => {
    const childTable = buildTable(
      parseProperties(childSchema),
      CHILD_TABLE_NAME
    );
    const parentOneTable = buildTable(
      parseProperties(parentOneSchema),
      PARENT_ONE_TABLE_NAME
    );
    const parentTwoTable = buildTable(
      parseProperties(parentTwoSchema),
      PARENT_TWO_TABLE_NAME
    );
    const childRelationships =
      parseRelationships(childSchema).map(buildRelationship);
    const parentOneRelationships =
      parseRelationships(parentOneSchema).map(buildRelationship);
    const parentTwoRelationships =
      parseRelationships(parentTwoSchema).map(buildRelationship);

    console.log(
      buildDiagram("Test Diagram", [
        childTable,
        parentOneTable,
        parentTwoTable,
        ...childRelationships,
        ...parentOneRelationships,
        ...parentTwoRelationships,
      ])
    );
  });

  it("should generate diagram text", () => {
    const diagramText = generateDiagramText("Sample Diagram", [
      userSchema,
      postSchema,
    ]);
    console.log(diagramText);
  });
});
