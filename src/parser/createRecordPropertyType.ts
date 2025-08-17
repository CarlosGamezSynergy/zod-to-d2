import { type PropertyType } from "../types/Property.type.js";

export function createRecordPropertyType(
  name: string,
  keyType: PropertyType,
  valueType: PropertyType,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: "record",
    keyType,
    valueType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
