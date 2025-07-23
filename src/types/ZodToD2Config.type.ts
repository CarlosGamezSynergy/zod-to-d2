import { OneOf } from "./OneOf.type";

export type ZodToD2Config = OneOf<[{
    directory: string;
    outputPath?: string;
    title?: string;
} | {
    filePaths: string[];
    outputPath?: string;
    title?: string;
}]>