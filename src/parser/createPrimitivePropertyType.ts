import { PropertyType, PropertyTypeName } from "../types/Property.type";


export function createPrimitivePropertyType<T extends PropertyType>(
  name: string,
  propertyType: Extract<
    PropertyTypeName, 'string' | 'boolean' | 'number' | 'datetime' | 'date' | 'bigint'
  >,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  notes?: string[]
): T {
  return {
    name,
    type: propertyType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    notes: notes ?? [],
  } as T;
}
