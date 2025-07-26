import * as z4 from "zod/v4/core";

export type MatchingKeys<
  T extends z4.$ZodObject,
  TBaseSchema extends z4.$ZodType
> = {
  [P in keyof T["_zod"]["def"]["shape"]]: T["_zod"]["def"]["shape"][P] extends TBaseSchema
    ? P
    : never;
}[keyof T["_zod"]["def"]["shape"]];
