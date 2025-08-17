import { $ZodType } from "zod/v4/core";
import { ZodForeignKeyDef } from "../types/ZodForeignKeyDef.js";

export function getForeignKeyFromMeta<T extends $ZodType & { meta: () => any }>(
  schema: T
): ZodForeignKeyDef | undefined {
  const meta = schema.meta();
  if (!meta || !meta.foreignKey) {
    return undefined;
  }
  return meta.foreignKey as ZodForeignKeyDef;
}
