import { describe, expect, it } from "vitest";
import { parseProperties } from "../../src/parser/parseProperties";
import { parentOneSchema, schemaWithoutParentName } from "../schema.fixtures";

describe("Parsing Tests", () => {
  describe("Basic Parsing", () => {
    it("should parse a simple schema correctly", () => {
      const props = parseProperties(parentOneSchema);
      expect(props).toHaveLength(3);
      expect(props).toEqual([
        {
          name: 'parent_one_table.id',
          type: 'string',
          isOptional: false,
          isNullable: false,
          isPrimaryKey: true,
          isForeignKey: false,
          notes: []
        },
        {
          name: 'parent_one_table.name',
          type: 'string',
          isOptional: false,
          isNullable: false,
          isPrimaryKey: false,
          isForeignKey: false,
          notes: ['This is the parent one name']
        },
        {
          name: 'parent_one_table.description',
          type: 'string',
          isOptional: true,
          isNullable: false,
          isPrimaryKey: false,
          isForeignKey: false,
          notes: []
        }
      ]);
    });

    it("should assign unknown_table name if no tableName is provided", () => {
      const props = parseProperties(schemaWithoutParentName);
      expect(props).toHaveLength(4);
      expect(props[0].name).toBe('unknown_table.id');
      expect(props[1].name).toBe('unknown_table.parentOneId');
      expect(props[2].name).toBe('unknown_table.name');
      expect(props[3].name).toBe('unknown_table.description');
    });

    it("should override unknown_table name with provided propertyName", () => {
      const props = parseProperties(schemaWithoutParentName, 'custom_table');
      expect(props).toHaveLength(4);
      expect(props[0].name).toBe('custom_table.id');
      expect(props[1].name).toBe('custom_table.parentOneId');
      expect(props[2].name).toBe('custom_table.name');
      expect(props[3].name).toBe('custom_table.description');
    });

    it("should override provided tableName if one is passed", () => {
      const props = parseProperties(parentOneSchema, 'custom_table');
      expect(props).toHaveLength(3);
      expect(props[0].name).toBe('custom_table.id');
      expect(props[1].name).toBe('custom_table.name');
      expect(props[2].name).toBe('custom_table.description');
    });
  });

  describe("Complex Parsing", () => {
    it("should parse nested schemas correctly", () => {

    });

    it("should handle arrays and objects in schemas", () => {

    });
  });

  describe("Error Handling", () => {
    it("should throw an error for invalid input", () => {

    });

    it("should return a specific error message for missing fields", () => {

    });
  });
});
