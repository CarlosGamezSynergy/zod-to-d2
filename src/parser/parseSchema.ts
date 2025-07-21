import * as z4 from "zod/v4/core";
import { createArrayPropertyType, createEnumPropertyType, createLiteralPropertyType, createPrimitivePropertyType, createRecordPropertyType, createUnknownPropertyType } from "../builder/createPropertyTypes";
import { PropertyRelationship, PropertyType } from "../types/Property.type";
import { getObjectProperties } from "./getObjectProperties";

export function isPrimaryKey<T extends z4.$ZodType>(schema: T) {
  return z4.globalRegistry.get(schema)?.primaryKey !== undefined;
}

export function isForeignKey<T extends z4.$ZodType>(schema: T) {
  return z4.globalRegistry.get(schema)?.foreignKey !== undefined;
}

export function hasNotes<T extends z4.$ZodType>(schema: T) {
  return z4.globalRegistry.get(schema)?.notes !== undefined;
}

export function parseSchema(_schema: z4.$ZodType, propertyName: string = 'root', isOptional = false, isNullable = false): PropertyType[] {
  const properties = new Array<PropertyType>();
  const relationships = new Array<PropertyRelationship>();
  const schema = _schema as z4.$ZodTypes;
  const def = schema._zod.def;

  const isPrimary = isPrimaryKey(schema);
  const isForeign = isForeignKey(schema);
  const notes = hasNotes(schema) ? z4.globalRegistry.get(schema)?.notes as string[] ?? [] : [];

  switch (def.type) {
    case "optional": {
      const optionalSchema = schema as z4.$ZodOptional;
      const innerType = optionalSchema._zod.def.innerType;
      const innerProperties = parseSchema(innerType, propertyName, true, isNullable);
      properties.push(...innerProperties);
      break;
    }

    case "nullable": {
      const nullableSchema = schema as z4.$ZodNullable;
      const innerType = nullableSchema._zod.def.innerType;
      const innerProperties = parseSchema(innerType, propertyName, isOptional, true);
      properties.push(...innerProperties);
      break;
    }

    case "object": {
      const objectProperties = getObjectProperties(schema as z4.$ZodObject);
      properties.push(...objectProperties.flatMap((prop) => parseSchema(prop[1], `${propertyName}.${prop[0]}`)));
      break;
    }

    case "record": {
      const recordSchema = schema as z4.$ZodRecord;
      const keyType = parseSchema(recordSchema._zod.def.keyType, 'key');
      const valueType = parseSchema(recordSchema._zod.def.valueType, 'value');

      properties.push(
        createRecordPropertyType(propertyName, keyType[0], valueType[0], isOptional, isNullable, isPrimary, isForeign, relationships, [...notes])
      );
      break;
    }

    case "string": {
      const stringSchema = schema as z4.$ZodStringFormatTypes;
      const stringFormat = stringSchema._zod.def.format;

      switch (stringFormat) {
        case "date": {
          properties.push(
            createPrimitivePropertyType(
              propertyName,
              'date',
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
              relationships,
              [...notes]
            )
          );
          break;
        }

        case "datetime": {
          properties.push(
            createPrimitivePropertyType(
              propertyName,
              'datetime',
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
              relationships,
              [...notes]
            )
          );
          break;
        }

        default: {
          properties.push(
            createPrimitivePropertyType(
              propertyName,
              'string',
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
              relationships,
              [...notes]

            )
          );
          break;
        }
      }

      break;
    }

    case "date": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          'date',
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    case "number": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          'number',
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]

        )
      );
      break;
    }

    case "bigint": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          'bigint',
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    case "boolean": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          'boolean',
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    case "array": {
      const arraySchema = schema as z4.$ZodArray;
      const elementType = arraySchema._zod.def.element;
      const elementProperties = parseSchema(elementType, `${propertyName}[]`);

      properties.push(
        createArrayPropertyType(
          propertyName,
          elementProperties[0],
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );

      break;
    }

    case "enum": {
      const enumSchema = schema as z4.$ZodEnum;
      const entries = enumSchema._zod.def.entries as Record<string, string>;

      properties.push(
        createEnumPropertyType(
          propertyName,
          entries,
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    case "literal": {
      const literalSchema = schema as z4.$ZodLiteral;
      const literalValue = literalSchema._zod.def.values[0]?.valueOf();

      console.log(literalValue);

      properties.push(
        createLiteralPropertyType(
          propertyName,
          literalValue,
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    default: {
      properties.push(
        createUnknownPropertyType(
          propertyName,
          schema._zod.def.type,
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        ));
    }
  }


  // if (Object.prototype.hasOwnProperty.call(schema, '_def')) {
  //   if (schema.description) {
  //     const parentForeignKeyChain = getForeignKeyFromDescription(
  //       schema.description
  //     );
  //     if (parentForeignKeyChain.length > 1) {
  //       relationships.push({
  //         foreignEntity: parentForeignKeyChain[0],
  //         foreignEntityPropertyChain: parentForeignKeyChain.slice(1),
  //       });
  //     }
  //   }

  //   switch (schema._def.typeName) {
  //     case 'ZodObject': {
  //       const objectProperties = Object.entries(schema._def.shape()).flatMap(
  //         ([key, value]) => {
  //           return [...inferSchema(key, value as ZodTypeAny)];
  //         }
  //       );
  //       properties.push(createObjectPropertyType(name, objectProperties));
  //       break;
  //     }

  //     case 'ZodNativeEnum': {
  //       properties.push(
  //         createEnumPropertyType(name, schema._def.values, false, false)
  //       );
  //       break;
  //     }

  //     case 'ZodUnion': {
  //       const unionProperties = Object.entries(schema._def.options).flatMap(
  //         ([index, value]) => {
  //           return [...inferSchema(`type_[${index}]`, value as ZodTypeAny)];
  //         }
  //       );

  //       properties.push(createUnionPropertyType(name, unionProperties));
  //       break;
  //     }

  //     case 'ZodNullable':
  //       properties.push(
  //         ...inferSchema(name, schema._def.innerType).map((p) => ({
  //           ...p,
  //           isNullable: true,
  //         }))
  //       );
  //       break;

  //     case 'ZodOptional':
  //       properties.push(
  //         ...inferSchema(name, schema._def.innerType).map((p) => ({
  //           ...p,
  //           isOptional: true,
  //           relationships: relationships,
  //         }))
  //       );
  //       break;

  //     case 'ZodEffects': {
  //       properties.push(...inferSchema(name, schema._def.schema));
  //       break;
  //     }

  //     case 'ZodDefault': {
  //       properties.push(...inferSchema(name, schema._def.innerType));
  //       break;
  //     }
  // }

  return properties;
}
