import * as z4 from "zod/v4/core";
import { getObjectProperties } from "./getObjectProperties";
import { PropertyType } from "./ZodSchemaParser";

export function inferSchema(_schema: z4.$ZodType): PropertyType[] {
  const properties = new Array<PropertyType>();
  const schema = _schema as z4.$ZodTypes;
  const def = schema._zod.def;

  switch (def.type) {
    case "object": {
      const objectProperties = getObjectProperties(schema as z4.$ZodObject);
      objectProperties.forEach((property) => inferSchema(property[1]));
      break;
    }
    default: {
      console.log(schema);
    }
  }

  // const relationships = new Array<PropertyRelationship>();

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

  //     case 'ZodString':
  //       if (schema._def.checks &&
  //         schema._def.checks.length > 0 &&
  //         schema._def.checks
  //           .map((c: ZodStringCheck) => c.kind)
  //           .includes('datetime')) {
  //         properties.push(createPrimitivePropertyType(name, 'datetime'));
  //       } else if (schema._def.checks &&
  //         schema._def.checks.length > 0 &&
  //         schema._def.checks.map((c: ZodStringCheck) => c.kind).includes('date')) {
  //         properties.push(createPrimitivePropertyType(name, 'date'));
  //       } else {
  //         properties.push(
  //           createPrimitivePropertyType(
  //             name,
  //             'string',
  //             false,
  //             false,
  //             relationships
  //           )
  //         );
  //       }
  //       break;

  //     case 'ZodNumber':
  //       properties.push(
  //         createPrimitivePropertyType(
  //           name,
  //           'number',
  //           false,
  //           false,
  //           relationships
  //         )
  //       );
  //       break;

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

  //     default:
  //       properties.push(createUnknownPropertyType(name, schema._def.typeName));
  //   }
  // }

  return properties;
}
