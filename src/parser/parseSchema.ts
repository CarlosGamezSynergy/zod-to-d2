import * as z4 from "zod/v4/core";
import { createPrimitivePropertyType } from "../builder/createPropertyTypes";
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

export function parseSchema(_schema: z4.$ZodType, propertyName: string = 'root'): PropertyType[] {
  const properties = new Array<PropertyType>();
  const relationships = new Array<PropertyRelationship>();
  const schema = _schema as z4.$ZodTypes;
  const def = schema._zod.def;

  const isPrimary = isPrimaryKey(schema);
  const isForeign = isForeignKey(schema);
  const notes = hasNotes(schema) ? z4.globalRegistry.get(schema)?.notes as string[] ?? [] : [];

  switch (def.type) {
    case "object": {
      const objectProperties = getObjectProperties(schema as z4.$ZodObject);
      properties.push(...objectProperties.flatMap((prop) => parseSchema(prop[1], `${propertyName}.${prop[0]}`)));
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
              false,
              false,
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
              false,
              false,
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
              false,
              false,
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

    case "number": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          'number',
          false,
          false,
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
          false,
          false,
          isPrimary,
          isForeign,
          relationships,
          [...notes]
        )
      );
      break;
    }

    default: {
      // properties.push(createUnknownPropertyType(propertyName, schema._zod.def.type));
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

  //     case 'ZodRecord': {
  //       const keyType = inferSchema('key', schema._def.keyType);
  //       const valueType = inferSchema('value', schema._def.valueType);

  //       properties.push(
  //         createRecordPropertyType(name, keyType[0], valueType[0])
  //       );
  //       break;
  //     }

  //     case 'ZodNativeEnum': {
  //       properties.push(
  //         createEnumPropertyType(name, schema._def.values, false, false)
  //       );
  //       break;
  //     }

  //     case 'ZodEnum': {
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

  //     case 'ZodBoolean':
  //       properties.push(createPrimitivePropertyType(name, 'boolean'));
  //       break;

  //     case 'ZodDate':
  //       properties.push(createPrimitivePropertyType(name, 'datetime'));
  //       break;

  //     case 'ZodArray': {
  //       const elementType = inferSchema(`elementOf_${name}`, schema._def.type);
  //       properties.push(createArrayPropertyType(name, elementType[0]));
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
