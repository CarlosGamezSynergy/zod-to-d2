import * as z4 from "zod/v4/core";
import { PropertyRelationship } from "../types/PropertyRelationship.type";
import { ZodForeignKeyDef } from "../types/ZodForeignKeyDef";
import { getObjectProperties } from "./getObjectProperties";
import { isForeignKey } from "./isForeignKey";

export function parseRelationships(_schema: z4.$ZodType, propertyName: string = 'root', isOptional = false, isNullable = false): PropertyRelationship[] {
    const relationships = new Array<PropertyRelationship>();
    const schema = _schema as z4.$ZodTypes;
    const def = schema._zod.def;
    const isForeign = isForeignKey(schema);

    switch (def.type) {
        case "object": {
            const objectProperties = getObjectProperties(schema as z4.$ZodObject);
            relationships.push(...objectProperties.flatMap((prop) => parseRelationships(prop[1], `${propertyName}.${prop[0]}`)));
            break;
        }

        default: {
            if (isForeign) {
                const foreignKey = z4.globalRegistry.get(schema)?.foreignKey as ZodForeignKeyDef;
                console.log(foreignKey)
            }
        }
    }

    return relationships;
}