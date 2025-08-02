import * as z4 from "zod/v4/core";
import { PropertyType } from "../types/Property.type";
import { createArrayPropertyType } from "./createArrayPropertyType";
import { createEnumPropertyType } from "./createEnumPropertyType";
import { createLiteralPropertyType } from "./createLiteralPropertyType";
import { createPrimitivePropertyType } from "./createPrimitivePropertyType";
import { createRecordPropertyType } from "./createRecordPropertyType";
import { createUnknownPropertyType } from "./createUnknownPropertyType";
import { getObjectProperties } from "./getObjectProperties";
import { hasNotes } from "./hasNotes";
import { isForeignKey } from "./isForeignKey";
import { isPrimaryKey } from "./isPrimaryKey";

export function parseProperties(
  _schema: z4.$ZodType,
  propertyName: string = "unknown_table",
  isOptional = false,
  isNullable = false
): PropertyType[] {
  const properties = new Array<PropertyType>();
  const schema = _schema as z4.$ZodTypes;
  const def = schema._zod.def;

  const isPrimary = isPrimaryKey(schema);
  const isForeign = isForeignKey(schema);
  const notes = hasNotes(schema)
    ? (z4.globalRegistry.get(schema)?.notes as string[]) ?? []
    : [];

  switch (def.type) {
    case "optional": {
      const optionalSchema = schema as z4.$ZodOptional;
      const innerType = optionalSchema._zod.def.innerType;
      const innerProperties = parseProperties(
        innerType,
        propertyName,
        true,
        isNullable
      );
      properties.push(...innerProperties);
      break;
    }

    case "nullable": {
      const nullableSchema = schema as z4.$ZodNullable;
      const innerType = nullableSchema._zod.def.innerType;
      const innerProperties = parseProperties(
        innerType,
        propertyName,
        isOptional,
        true
      );
      properties.push(...innerProperties);
      break;
    }

    case "object": {
      let tableName = propertyName;
      if (tableName === "unknown_table") {
        tableName =
          (z4.globalRegistry.get(schema)?.tableName as string) ?? propertyName;
      }

      const objectProperties = getObjectProperties(schema as z4.$ZodObject);
      properties.push(
        ...objectProperties.flatMap((prop) =>
          parseProperties(prop[1], `${tableName}.${prop[0]}`)
        )
      );
      break;
    }

    case "record": {
      const recordSchema = schema as z4.$ZodRecord;
      const keyType = parseProperties(recordSchema._zod.def.keyType, "key");
      const valueType = parseProperties(
        recordSchema._zod.def.valueType,
        "value"
      );

      properties.push(
        createRecordPropertyType(
          propertyName,
          keyType[0],
          valueType[0],
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          [...notes]
        )
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
              "date",
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
              [...notes]
            )
          );
          break;
        }

        case "datetime": {
          properties.push(
            createPrimitivePropertyType(
              propertyName,
              "datetime",
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
              [...notes]
            )
          );
          break;
        }

        default: {
          properties.push(
            createPrimitivePropertyType(
              propertyName,
              "string",
              isOptional,
              isNullable,
              isPrimary,
              isForeign,
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
          "date",
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          [...notes]
        )
      );
      break;
    }

    case "number": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          "number",
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          [...notes]
        )
      );
      break;
    }

    case "bigint": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          "bigint",
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          [...notes]
        )
      );
      break;
    }

    case "boolean": {
      properties.push(
        createPrimitivePropertyType(
          propertyName,
          "boolean",
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
          [...notes]
        )
      );
      break;
    }

    case "array": {
      const arraySchema = schema as z4.$ZodArray;
      const elementType = arraySchema._zod.def.element;
      const elementProperties = parseProperties(
        elementType,
        `${propertyName}[]`
      );

      properties.push(
        createArrayPropertyType(
          propertyName,
          elementProperties[0],
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
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
          [...notes]
        )
      );
      break;
    }

    case "literal": {
      const literalSchema = schema as z4.$ZodLiteral;
      const literalValue = literalSchema._zod.def.values[0]?.valueOf();

      properties.push(
        createLiteralPropertyType(
          propertyName,
          literalValue,
          isOptional,
          isNullable,
          isPrimary,
          isForeign,
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
          [...notes]
        )
      );
      break;
    }
  }

  return properties;
}
