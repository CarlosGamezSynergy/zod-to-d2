import { OneOf } from "./OneOf.type";

export type BaseProperty = {
  name: string;
  isOptional: boolean;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  notes?: string[]
};

export type StringProperty = BaseProperty & {
  type: 'string';
};

export type LiteralProperty = BaseProperty & {
  type: 'literal';
  value: string | number | boolean | undefined | Object;
};

export type DateTimeProperty = BaseProperty & {
  type: 'datetime';
};

export type DateProperty = BaseProperty & {
  type: 'date';
};

export type NumberProperty = BaseProperty & {
  type: 'number';
};

export type BigIntProperty = BaseProperty & {
  type: 'bigint';
};

export type BooleanProperty = BaseProperty & {
  type: 'boolean';
};

export type ArrayProperty = BaseProperty & {
  type: 'array';
  elementType: PropertyType;
};

export type ObjectProperty = BaseProperty & {
  type: 'object';
  properties: PropertyType[];
};

export type RecordProperty = BaseProperty & {
  type: 'record';
  keyType: PropertyType;
  valueType: PropertyType;
};

export type EnumProperty = BaseProperty & {
  type: 'enum';
  values: Record<string, string>;
};

export type UnionProperty = BaseProperty & {
  type: 'union';
  unionProps: PropertyType[];
};

export type UnknownType = BaseProperty & {
  type: 'unknown';
  received: string;
};


export type PropertyType = OneOf<[
  StringProperty,
  LiteralProperty,
  DateTimeProperty,
  DateProperty,
  NumberProperty,
  BigIntProperty,
  BooleanProperty,
  ArrayProperty,
  ObjectProperty,
  RecordProperty,
  EnumProperty,
  UnionProperty,
  UnknownType
]>;

export type PropertyTypeName = Extract<PropertyType, { type: string }>['type'];

export function isStringProperty(val: PropertyType): val is Extract<PropertyType, { type: 'string' }> {
  return val !== undefined && val.type === 'string';
}

export function isLiteralProperty(val: PropertyType): val is Extract<PropertyType, { type: 'literal' }> {
  return val !== undefined && val.type === 'literal';
}

export function isDateTimeProperty(val: PropertyType): val is Extract<PropertyType, { type: 'datetime' }> {
  return val !== undefined && val.type === 'datetime';
}

export function isDateProperty(val: PropertyType): val is Extract<PropertyType, { type: 'date' }> {
  return val !== undefined && val.type === 'date';
}

export function isNumberProperty(val: PropertyType): val is Extract<PropertyType, { type: 'number' }> {
  return val !== undefined && val.type === 'number';
}

export function isBooleanProperty(val: PropertyType): val is Extract<PropertyType, { type: 'boolean' }> {
  return val !== undefined && val.type === 'boolean';
}

export function isArrayProperty(val: PropertyType): val is Extract<PropertyType, { type: 'array' }> {
  return val !== undefined && val.type === 'array';
}

export function isObjectProperty(val: PropertyType): val is Extract<PropertyType, { type: 'object' }> {
  return val !== undefined && val.type === 'object';
}

export function isEnumProperty(val: PropertyType): val is Extract<PropertyType, { type: 'enum' }> {
  return val !== undefined && val.type === 'enum';
}

export function isRecordProperty(val: PropertyType): val is Extract<PropertyType, { type: 'record' }> {
  return val !== undefined && val.type === 'record';
}

export function isUnknownProperty(val: PropertyType): val is Extract<PropertyType, { type: 'unknown' }> {
  return val !== undefined && val.type === 'unknown';
}