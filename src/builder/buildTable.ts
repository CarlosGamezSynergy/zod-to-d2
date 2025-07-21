import { PropertyType } from "../types/Property.type";
import { buildColumn } from "./buildColumn";

export function buildTable(tableName: string, properties: PropertyType[]) {
    let table =
        `${tableName}: {
    shape: sql_table
    `;

    table += properties.map((property) => buildColumn(property)).join("\n    ");

    table += `
}`;

    return table;
}