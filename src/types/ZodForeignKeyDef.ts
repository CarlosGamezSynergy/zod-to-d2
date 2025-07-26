import * as z4 from "zod/v4/core";

export type ZodForeignKeyDef<T extends z4.$ZodObject = z4.$ZodObject> = {
  type: "ZodForeignKey";
  foreignSchema: T;
  foreignProperty: keyof T["_zod"]["def"]["shape"];
};
