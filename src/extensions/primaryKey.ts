import * as z4 from "zod/v4/core";
import { ZodPrimaryKeyDef } from "../types/ZodPrimaryKeyDef";


z4.$ZodType.prototype.primaryKey = function foreignKey<
  TThis extends z4.$ZodType
>(this: z4.$ZodType & { meta: (meta: any) => TThis }) {
  const result = this.meta({
    primaryKey: {
      type: "ZodPrimaryKey",
    } as ZodPrimaryKeyDef,
  });

  return result;
};
