import { type PropertyType } from "../types/Property.type.js";

export function createUnionPropertyType(
  name: string,
  properties: PropertyType[],
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: "union",
    unionProps: properties,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
