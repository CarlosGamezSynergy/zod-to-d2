import { PropertyType } from "../types/Property.type";


export function createObjectPropertyType(
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
    type: 'object',
    properties,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
