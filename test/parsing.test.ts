import "src/extensions";
import { describe, it } from "vitest";
import z from "zod";
import { parseSchema } from "../src/parser/parseSchema";

describe("Parsing Tests", () => {
  const parentSchema = z.object({
    id: z.string().primaryKey(),
    name: z.string(),
    description: z.string().optional(),
  });

  const childSchema = z.object({
    id: z.string().primaryKey().notes("This is the primary key of the child schema"),
    parentId: z.string().foreignKey(parentSchema, "id"),
    parentNameWithNotes: z.string().foreignKey(parentSchema, "name").notes("This is a foreign key with notes"),
    stringProperty: z.string(),
    stringWithDescription: z.string().notes("This is a string with a description").notes("Additional notes for the string"),
    numberProperty: z.number(),
    integerProperty: z.number().int(),
    booleanProperty: z.boolean(),
    isoDateProperty: z.iso.datetime(),
    isoDurationProperty: z.iso.duration(),
    dateProperty: z.date(),
    arrayProperty: z.array(z.string().notes("Notes for the array element")).notes("This is an array of strings"),
    nullableProperty: z.string().nullable(),
    optionalProperty: z.string().optional(),
    effectsProperty: z.string().transform((val) => val.toUpperCase()),
    objectProperty: z.object({
      nestedString: z.string(),
      nestedNumber: z.number(),
    }),
    unionProperty: z.union([z.string(), z.number()]),
    enumProperty: z.enum(["option1", "option2", "option3"]),
    literalProperty: z.literal("literalValue"),
    tupleProperty: z.tuple([z.string(), z.number()]),
    recordProperty: z.record(z.string(), z.number()),
    bigintProperty: z.bigint(),
    symbolProperty: z.symbol(),
    unknownProperty: z.unknown(),
    anyProperty: z.any(),
    neverProperty: z.never(),
    customProperty: z.custom<{ customField: string }>(),
  });

  it("should parse a simple expression", () => {
    console.log(parseSchema(childSchema, 'childSchema'));
  });
});
