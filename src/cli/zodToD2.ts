import { $ZodObject, $ZodType, globalRegistry } from "zod/v4/core";
import { buildDiagram, buildRelationship, buildTable } from "../builder";
import { loadZodSchemas, scanDirectory } from "../loader";
import { parseProperties, parseRelationships } from "../parser";
import { isLoadedZodSchemaSuccess, ZodToD2Config } from "../types";
import { saveToFile } from "./saveToFile";

export async function zodToD2(config: ZodToD2Config): Promise<void> {
  let filePaths: string[] = [];
  let title: string | undefined;

  console.log("Starting D2 Diagram generation...");

  if (config.source === "directory") {
    filePaths = await scanDirectory(config.directory);
    console.log(`Scanning directory: ${config.directory}`);
    if (filePaths.length === 0) {
      console.warn("No Zod schema files found in the specified directory.");
      return;
    }
    console.log(`Found ${filePaths.length} schema files.`);
  } else if (config.source === "filePaths") {
    filePaths = config.filePaths;
  } else {
    throw new Error("Invalid configuration provided to zodToD2");
  }

  title = config.title ?? "Generated Diagram";

  const loadedSchemas = await Promise.all(
    filePaths.map((filePath) => loadZodSchemas(filePath))
  );
  const successfulSchemas = loadedSchemas
    .flat()
    .filter(isLoadedZodSchemaSuccess);

  const diagramElements = new Array<string>();

  successfulSchemas.forEach((s) => {
    console.log(`Processing schema: ${s.key || "Unnamed Schema"}...`);
    const tableName =
      (globalRegistry.get(s.schema as $ZodObject)?.tableName as string) ||
      s.key ||
      "unknown_table";
    const properties = parseProperties(s.schema as $ZodType, tableName);
    const relationships = parseRelationships(s.schema as $ZodType, tableName);

    diagramElements.push(buildTable(properties, tableName));
    diagramElements.push(...relationships.map(buildRelationship));
  });

  const fileContent = buildDiagram(
    title ?? "Generated Diagram",
    diagramElements
  );

  await saveToFile(config.outputPath || "./diagram.d2", fileContent);

  console.log("D2 Diagram generation complete.");
}
