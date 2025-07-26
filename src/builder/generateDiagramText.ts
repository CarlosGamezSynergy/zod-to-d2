import * as z4 from "zod/v4/core";
import { parseProperties, parseRelationships } from "../parser";
import { buildDiagram } from "./buildDiagram";
import { buildRelationship } from "./buildRelationship";
import { buildTable } from "./buildTable";

export function generateDiagramText(
  title: string,
  schemas: z4.$ZodObject[]
): string {
  const diagramElements = new Array<string>();

  schemas.forEach((s) => {
    const tableName =
      (z4.globalRegistry.get(s)?.tableName as string) || "unknown_table";
    const properties = parseProperties(s as z4.$ZodType, tableName);
    const relationships = parseRelationships(s as z4.$ZodType, tableName);

    diagramElements.push(buildTable(properties, tableName));
    diagramElements.push(...relationships.map(buildRelationship));
  });

  const diagram = buildDiagram(title ?? "Generated Diagram", diagramElements);

  return diagram;
}
