import * as z4 from "zod/v4/core";

export function hasNotes<T extends z4.$ZodType>(schema: T) {
  return z4.globalRegistry.get(schema)?.notes !== undefined;
}
