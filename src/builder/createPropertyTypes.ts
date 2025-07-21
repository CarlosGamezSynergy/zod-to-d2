import { PropertyRelationship, PropertyType, PropertyTypeName } from "../types/Property.type";

export function createPrimitivePropertyType<T extends PropertyType>(
  name: string,
  propertyType: Extract<
    PropertyTypeName, 'string' | 'boolean' | 'number' | 'datetime' | 'date' | 'bigint'
  >,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
  notes?: string[]
): T {
  return {
    name,
    type: propertyType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as T;
}

export function createLiteralPropertyType(
  name: string,
  value: string | number | boolean | undefined | Object,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
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
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createArrayPropertyType(
  name: string,
  elementType: PropertyType,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'array',
    elementType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createObjectPropertyType(
  name: string,
  properties: PropertyType[],
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
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
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createEnumPropertyType(
  name: string,
  values: Record<string, string>,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'enum',
    values,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createRecordPropertyType(
  name: string,
  keyType: PropertyType,
  valueType: PropertyType,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'record',
    keyType,
    valueType,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createUnionPropertyType(
  name: string,
  properties: PropertyType[],
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
  notes?: string[]
): PropertyType {
  return {
    name,
    type: 'union',
    // properties,
    isOptional,
    isNullable,
    isPrimaryKey,
    isForeignKey,
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function createUnknownPropertyType(
  name: string,
  received: string,
  isOptional = false,
  isNullable = false,
  isPrimaryKey = false,
  isForeignKey = false,
  relationships?: PropertyRelationship[],
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
    relationships: relationships ?? [],
    notes: notes ?? [],
  } as PropertyType;
}

export function getForeignKeyFromDescription(description: string) {
  const descriptionSections = description.split(',');

  const propertyChain: string[] = [];

  descriptionSections.forEach((desc) => {
    if (desc.includes('->')) {
      const [key, value] = desc.split('->');
      if (key === 'FK') propertyChain.push(...value.split('.'));
    }
  });

  return propertyChain;
}
