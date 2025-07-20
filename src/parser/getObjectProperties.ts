import * as z4 from "zod/v4/core";

export function getObjectProperties<T extends z4.$ZodObject>(schema: T) {
  const properties = new Array<z4.$ZodType>();
  const shape = schema._zod.def.shape;

  return Object.entries(shape);
}
