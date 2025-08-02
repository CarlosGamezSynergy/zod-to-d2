import { z } from "zod";
import "../src";

export const PARENT_ONE_TABLE_NAME = "parent_one_table";
export const PARENT_ONE_NAME_NOTES = "This is the parent one name";
export const PARENT_TWO_TABLE_NAME = "parent_two_table";
export const CHILD_TABLE_NAME = "child_table";
export const CHILD_PRIMARY_KEY_COMMENT =
  "This is the primary key of the child schema";
export const CHILD_ENUM_PROPERTY_OPTIONS = ["option1", "option2", "option3"];
export const CHILD_PARENT_ONE_ID_COMMENT =
  "This is the parent one ID in the child schema";
export const CHILD_PARENT_TWO_ID_COMMENT =
  "This is the parent two ID in the child schema";
export const CHILD_PARENT_NAME_WITH_NOTES_COMMENTS = [
  "This is a string field with notes for the parent name in the child schema",
  "Additional notes for the string field in the child schema",
];
export const CHILD_NUMBER_PROPERTY_NOTES = [
  "This is a number field with notes in the child schema",
  "Additional notes for the number field in the child schema",
];
export const CHILD_ARRAY_PROPERTY_NOTES = [
  "This is an array field with notes in the child schema",
  "Additional notes for the array field in the child schema",
];
export const CHILD_LITERAL_PROPERTY_VALUE = "literalValue";

export const schemaWithoutMetadata = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const parentOneSchema = z
  .object({
    id: z.string().primaryKey(),
    name: z.string().notes(PARENT_ONE_NAME_NOTES),
    description: z.string().optional(),
  })
  .tableName(PARENT_ONE_TABLE_NAME);

export const parentTwoSchema = z
  .object({
    id: z.string().primaryKey(),
    name: z.string(),
    description: z.string().optional(),
  })
  .tableName(PARENT_TWO_TABLE_NAME);

export const schemaWithoutTableName = z.object({
  id: z.string().primaryKey(),
  parentOneId: z.string().foreignKey(parentOneSchema, "id"),
  name: z.string(),
  description: z.string().optional(),
});

export const childSchema = z
  .object({
    id: z.string().primaryKey().notes(CHILD_PRIMARY_KEY_COMMENT),
    parentOneId: z
      .string()
      .foreignKey(parentOneSchema, "id")
      .notes(CHILD_PARENT_ONE_ID_COMMENT),
    parentTwoId: z
      .string()
      .foreignKey(parentTwoSchema, "id")
      .notes(CHILD_PARENT_TWO_ID_COMMENT),
    parentNameWithNotes: z
      .string()
      .notes(CHILD_PARENT_NAME_WITH_NOTES_COMMENTS[0])
      .notes(CHILD_PARENT_NAME_WITH_NOTES_COMMENTS[1]),
    stringProperty: z.string(),
    stringWithDescription: z.string(),
    numberProperty: z
      .number()
      .notes(CHILD_NUMBER_PROPERTY_NOTES[0])
      .notes(CHILD_NUMBER_PROPERTY_NOTES[1]),
    integerProperty: z.number().int(),
    booleanProperty: z.boolean(),
    isoDateProperty: z.iso.datetime(),
    isoDurationProperty: z.iso.duration(),
    dateProperty: z.date(),
    arrayProperty: z.array(
      z
        .string()
        .notes(CHILD_ARRAY_PROPERTY_NOTES[0])
        .notes(CHILD_ARRAY_PROPERTY_NOTES[1])
    ), // Notes on array elements
    nullableProperty: z.string().nullable(),
    optionalProperty: z.string().optional(),
    effectsProperty: z.string().transform((val) => val.toUpperCase()),
    objectProperty: z.object({
      nestedString: z.string(),
      nestedNumber: z.number(),
    }),
    unionProperty: z.union([z.string(), z.number()]),
    enumProperty: z.enum(CHILD_ENUM_PROPERTY_OPTIONS),
    literalProperty: z.literal(CHILD_LITERAL_PROPERTY_VALUE),
    tupleProperty: z.tuple([z.string(), z.number()]),
    recordProperty: z.record(z.string(), z.number()),
    bigintProperty: z.bigint(),
    symbolProperty: z.symbol(),
    unknownProperty: z.unknown(),
    anyProperty: z.any(),
    neverProperty: z.never(),
    customProperty: z.custom<{ customField: string }>(),
  })
  .tableName(CHILD_TABLE_NAME);
