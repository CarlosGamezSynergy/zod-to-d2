import { $ZodObject, $ZodType } from "zod/v4/core";
import "./src/foreignKey";
import { EnsureIs } from "./src/types/EnsureIs.type";

declare module "zod" {
    interface ZodType {
        foreignKey<
            TThis extends $ZodType,
            TForeign extends $ZodObject,
            TKey extends keyof TForeign["_zod"]["def"]["shape"]
        >(
            this: TThis,
            foreignSchema: TForeign,
            foreignProperty: TKey
        ): EnsureIs<
            TThis,
            TForeign["_zod"]["def"]["shape"][TKey],
            "Foreign key type mismatch"
        >;
    }
}