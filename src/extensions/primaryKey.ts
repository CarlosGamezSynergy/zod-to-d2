import * as z4 from "zod/v4/core";
import { ZodPrimaryKeyDef } from "../types/ZodPrimaryKeyDef";

z4.$ZodType.prototype.primaryKey = function primaryKey<T extends z4.$ZodType>(this: T): T {
  if (
    this._zod.def.type === "optional" ||
    this._zod.def.type === "nullable"
  ) {
    throw new Error(
      `Primary key in cannot be optional or nullable.`
    );
  }

  const currentMetadata = z4.globalRegistry.get(this);

  if (currentMetadata) {
    if (currentMetadata.primaryKey) {
      throw new Error(
        'Primary key already defined for this schema.'
      );
    } else {
      currentMetadata.primaryKey = {
        type: "ZodPrimaryKey",
      } as ZodPrimaryKeyDef;
    }

    z4.globalRegistry.add(this, currentMetadata);
  } else {
    z4.globalRegistry.add(this, {
      primaryKey: {
        type: "ZodPrimaryKey"
      } as ZodPrimaryKeyDef,
    });
  }

  return this;
};
