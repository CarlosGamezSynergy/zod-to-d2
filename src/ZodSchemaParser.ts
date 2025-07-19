import { ZodStringCheck, ZodTypeAny } from 'zod';

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

export function inferSchema<T extends ZodTypeAny>(
  name: string,
  schema: T,
): PropertyType[] {
  const properties = new Array<PropertyType>();
  const relationships = new Array<PropertyRelationship>();

  if (Object.prototype.hasOwnProperty.call(schema, '_def')) {
    if (schema.description) {
      const parentForeignKeyChain = getForeignKeyFromDescription(
        schema.description,
      );
      if (parentForeignKeyChain.length > 1) {
        relationships.push({
          foreignEntity: parentForeignKeyChain[0],
          foreignEntityPropertyChain: parentForeignKeyChain.slice(1),
        });
      }
    }

    switch (schema._def.typeName) {
      case 'ZodObject': {
        const objectProperties = Object.entries(schema._def.shape()).flatMap(
          ([key, value]) => {
            return [...inferSchema(key, value as ZodTypeAny)];
          },
        );
        properties.push(createObjectPropertyType(name, objectProperties));
        break;
      }

      case 'ZodRecord': {
        const keyType = inferSchema('key', schema._def.keyType);
        const valueType = inferSchema('value', schema._def.valueType);

        properties.push(
          createRecordPropertyType(name, keyType[0], valueType[0]),
        );
        break;
      }

      case 'ZodNativeEnum': {
        properties.push(
          createEnumPropertyType(name, schema._def.values, false, false),
        );
        break;
      }

      case 'ZodEnum': {
        properties.push(
          createEnumPropertyType(name, schema._def.values, false, false),
        );
        break;
      }

      case 'ZodUnion': {
        const unionProperties = Object.entries(schema._def.options).flatMap(
          ([index, value]) => {
            return [...inferSchema(`type_[${index}]`, value as ZodTypeAny)];
          },
        );

        properties.push(createUnionPropertyType(name, unionProperties));
        break;
      }

      case 'ZodString':
        if (
          schema._def.checks &&
          schema._def.checks.length > 0 &&
          schema._def.checks
            .map((c: ZodStringCheck) => c.kind)
            .includes('datetime')
        ) {
          properties.push(createPrimitivePropertyType(name, 'datetime'));
        } else if (
          schema._def.checks &&
          schema._def.checks.length > 0 &&
          schema._def.checks.map((c: ZodStringCheck) => c.kind).includes('date')
        ) {
          properties.push(createPrimitivePropertyType(name, 'date'));
        } else {
          properties.push(
            createPrimitivePropertyType(
              name,
              'string',
              false,
              false,
              relationships,
            ),
          );
        }
        break;

      case 'ZodNumber':
        properties.push(
          createPrimitivePropertyType(
            name,
            'number',
            false,
            false,
            relationships,
          ),
        );
        break;

      case 'ZodBoolean':
        properties.push(createPrimitivePropertyType(name, 'boolean'));
        break;

      case 'ZodDate':
        properties.push(createPrimitivePropertyType(name, 'datetime'));
        break;

      case 'ZodArray': {
        const elementType = inferSchema(`elementOf_${name}`, schema._def.type);
        properties.push(createArrayPropertyType(name, elementType[0]));
        break;
      }

      case 'ZodNullable':
        properties.push(
          ...inferSchema(name, schema._def.innerType).map((p) => ({
            ...p,
            isNullable: true,
          })),
        );
        break;

      case 'ZodOptional':
        properties.push(
          ...inferSchema(name, schema._def.innerType).map((p) => ({
            ...p,
            isOptional: true,
            relationships: relationships,
          })),
        );
        break;

      case 'ZodEffects': {
        properties.push(...inferSchema(name, schema._def.schema));
        break;
      }

      case 'ZodDefault': {
        properties.push(...inferSchema(name, schema._def.innerType));
        break;
      }

      default:
        properties.push(createUnknownPropertyType(name, schema._def.typeName));
    }
  }

  return properties;
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
