type ZodToD2ConfigBase = {
  outputPath?: string; // Path where the D2 file will be written
  title?: string; // Title for the D2 diagram
};

export type ZodToD2Config =
  | (ZodToD2ConfigBase & {
      source: "directory";
      directory: string;
    })
  | (ZodToD2ConfigBase & {
      source: "filePaths";
      filePaths: string[];
    });
