import { type PropertyType } from "../types/Property.type.js";

export function createEnumPropertyType(
  name: string,
  values: Record<string, string>,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: "enum",
    values,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
