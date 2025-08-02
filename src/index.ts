import "zod";
import { $ZodObject, $ZodType } from "zod/v4/core";
import { MatchingKeys } from "./types";

declare module "zod" {
    interface ZodObject {
        tableName(name: string): this;
    }

    interface ZodType {
        foreignKey<
            TThis extends $ZodType,
            TForeign extends $ZodObject
        >(
            this: TThis,
            foreignSchema: TForeign,
            foreignProperty: MatchingKeys<TForeign, TThis>
        ): TThis;

        primaryKey<TThis extends $ZodType>(this: TThis): TThis;

        notes<TThis extends $ZodType>(this: TThis, ...notes: string[]): TThis;
    }
}

export * from "./builder";
// export * from "./cli";
export * from "./extensions";
export * from "./loader";
export * from "./parser";
export * from "./types";
export * from "./utils";

