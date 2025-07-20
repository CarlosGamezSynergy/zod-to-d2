
export function createPrimitivePropertyType<T extends PropertyType>(
  name: string,
  propertyType: Extract<
    PropertyTypeName,
    'string' | 'boolean' | 'number' | 'datetime' | 'date'
  >,
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): T {
  return {
    name,
    type: propertyType,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  } as T;
}

export function createArrayPropertyType(
  name: string,
  elementType: PropertyType,
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'array',
    elementType,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  };
}

export function createObjectPropertyType(
  name: string,
  properties: PropertyType[],
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'object',
    properties,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  };
}

export function createEnumPropertyType(
  name: string,
  values: Record<string, string>,
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'enum',
    values,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  };
}

export function createRecordPropertyType(
  name: string,
  keyType: PropertyType,
  valueType: PropertyType,
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'record',
    keyType,
    valueType,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  };
}

export function createUnionPropertyType(
  name: string,
  properties: PropertyType[],
  isOptional = false,
  isNullable = false,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'union',
    properties,
    isOptional,
    isNullable,
    relationships: relationships ?? [],
  };
}

export function createUnknownPropertyType(
  name: string,
  received: string,
  relationships?: PropertyRelationship[],
): PropertyType {
  return {
    name,
    type: 'unknown',
    received,
    isOptional: false,
    isNullable: false,
    relationships: relationships ?? [],
  };
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

export type PropertyRelationship = {
  foreignEntity: string;
  foreignEntityPropertyChain: string[];
};

export type PropertyType =
  | StringProperty
  | DateTimeProperty
  | DateProperty
  | NumberProperty
  | BooleanProperty
  | ArrayProperty
  | ObjectProperty
  | RecordProperty
  | EnumProperty
  | UnionProperty
  | UnknownType;

export type PropertyTypeName = Extract<PropertyType, { type: string }>['type'];

export function isStringProperty(val: PropertyType): val is StringProperty {
  return val !== undefined && val.type === 'string';
}

export function isDateTimeProperty(val: PropertyType): val is DateTimeProperty {
  return val !== undefined && val.type === 'datetime';
}

export function isDateProperty(val: PropertyType): val is DateProperty {
  return val !== undefined && val.type === 'date';
}

export function isNumberProperty(val: PropertyType): val is NumberProperty {
  return val !== undefined && val.type === 'number';
}

export function isBooleanProperty(val: PropertyType): val is BooleanProperty {
  return val !== undefined && val.type === 'boolean';
}

export function isArrayProperty(val: PropertyType): val is ArrayProperty {
  return val !== undefined && val.type === 'array';
}

export function isObjectProperty(val: PropertyType): val is ObjectProperty {
  return val !== undefined && val.type === 'object';
}

export function isEnumProperty(val: PropertyType): val is EnumProperty {
  return val !== undefined && val.type === 'enum';
}

export function isRecordProperty(val: PropertyType): val is RecordProperty {
  return val !== undefined && val.type === 'record';
}

export function isUnknownProperty(val: PropertyType): val is UnknownType {
  return val !== undefined && val.type === 'unknown';
}

export type StringProperty = {
  name: string;
  type: 'string';
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type DateTimeProperty = {
  name: string;
  type: 'datetime';
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type DateProperty = {
  name: string;
  type: 'date';
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type NumberProperty = {
  name: string;
  type: 'number';
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type BooleanProperty = {
  name: string;
  type: 'boolean';
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type ArrayProperty = {
  name: string;
  type: 'array';
  elementType: PropertyType;
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type ObjectProperty = {
  name: string;
  type: 'object';
  properties: PropertyType[];
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type RecordProperty = {
  name: string;
  type: 'record';
  keyType: PropertyType;
  valueType: PropertyType;
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type EnumProperty = {
  name: string;
  type: 'enum';
  values: Record<string, string>;
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type UnionProperty = {
  name: string;
  type: 'union';
  properties: PropertyType[];
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};

export type UnknownType = {
  name: string;
  type: 'unknown';
  received: string;
  isOptional: boolean;
  isNullable: boolean;
  relationships?: PropertyRelationship[];
};
