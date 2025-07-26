import { PropertyType } from "../types/Property.type";


export function createUnknownPropertyType(
  name: string,
  received: string,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'unknown',
    received,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
