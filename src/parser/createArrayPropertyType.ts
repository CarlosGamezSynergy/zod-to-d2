import { type PropertyType } from "../types/Property.type.js";

export function createArrayPropertyType(
  name: string,
  elementType: PropertyType,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: "array",
    elementType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
