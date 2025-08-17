import { type PropertyType } from "../types/Property.type.js";
import { buildColumn } from "./buildColumn.js";
import { buildTextFile } from "./buildTextFile.js";

export function buildTable(properties: PropertyType[], tableName: string) {
  let table = "";

  table += buildTextFile([`${tableName}: {`]);

  table += buildTextFile([`shape: sql_table`], 1);

  table += buildTextFile(
    properties.map((property) => buildColumn(property)),
    1
  );

  table += buildTextFile([`}`]);

  return table;
}
