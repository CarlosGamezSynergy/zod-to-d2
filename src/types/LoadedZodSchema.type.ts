import type z3 from 'zod/v3';
import type * as z4 from 'zod/v4/core';

export type LoadedZodSchema = {
    type: "LoadedZodSchemaSuccess";
    key: string;
    schema: z3.ZodType | z4.$ZodType;
} | {
    type: "LoadedZodSchemaError";
    errorMessage: string;
    error: Error;
    filePath: string;
}

export function isLoadedZodSchemaSuccess(schema: LoadedZodSchema): schema is Extract<LoadedZodSchema, { type: "LoadedZodSchemaSuccess" }> {
    return schema.type === "LoadedZodSchemaSuccess";
}

export function isLoadedZodSchemaError(schema: LoadedZodSchema): schema is Extract<LoadedZodSchema, { type: "LoadedZodSchemaError" }> {
    return schema.type === "LoadedZodSchemaError";
}