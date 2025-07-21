import { $ZodObject, $ZodType } from "zod/v4/core";
import "./src/extensions/foreignKey";
import { MatchingKeys } from "./src/types/MatchingKeys.type";

declare module "zod" {
  interface ZodType {
    foreignKey<
      TThis extends $ZodType,
      TForeign extends $ZodObject,
      TKey extends keyof TForeign["_zod"]["def"]["shape"]
    >(
      this: TThis,
      foreignSchema: TForeign,
      foreignProperty: MatchingKeys<TForeign, TThis>
    ): TThis;

    primaryKey<TThis extends $ZodType>(this: TThis): TThis;

    notes<TThis extends $ZodType>(this: TThis, ...notes: string[]): TThis;
  }
}
