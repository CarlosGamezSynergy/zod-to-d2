import * as z4 from "zod/v4/core";
import { ZodForeignKeyDef } from "../types/ZodForeignKeyDef";

z4.$ZodType.prototype.foreignKey = function foreignKey<
  TThis extends z4.$ZodType,
  TForeign extends z4.$ZodObject,
  TKey extends keyof TForeign["_zod"]["def"]["shape"]
>(
  this: z4.$ZodType & { meta: (meta: any) => TThis },
  foreignSchema: TForeign,
  foreignProperty: TKey
) {
  const foreignPropertySchema =
    foreignSchema._zod.def.shape[foreignProperty as string];

  if (
    foreignPropertySchema._zod.def.type === "optional" ||
    foreignPropertySchema._zod.def.type === "nullable"
  ) {
    throw new Error(
      `Foreign key '${String(
        foreignProperty
      )}' in foreign schema cannot be optional or nullable.`
    );
  }

  if (
    !this._zod.def.type ||
    !foreignPropertySchema._zod.def.type ||
    this._zod.def.type !== foreignPropertySchema._zod.def.type
  ) {
    throw new Error(
      `Type mismatch: '${String(
        foreignProperty
      )}' in foreign schema has type '${
        foreignPropertySchema._zod.def.type || "unknown"
      }', but expected '${this._zod.def.type || "unknown"}'`
    );
  }

  const result = this.meta({
    foreignKey: {
      type: "ZodForeignKey",
      foreignSchema,
      foreignProperty,
    } as ZodForeignKeyDef<TForeign>,
  });

  return result;
};
