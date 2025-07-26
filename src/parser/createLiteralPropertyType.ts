import { PropertyType } from "../types/Property.type";


export function createLiteralPropertyType(
  name: string,
  value: string | number | boolean | undefined | Object,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'literal',
    value,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as PropertyType;
}
