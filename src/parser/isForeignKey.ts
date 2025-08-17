import * as z4 from "zod/v4/core";

export function isForeignKey<T extends z4.$ZodType>(schema: T) {
  return z4.globalRegistry.get(schema)?.foreignKey !== undefined;
}
