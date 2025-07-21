export function buildDiagram(title: string, tables: string[]) {
    return `
    direction: down
    title: |md ${title} | { near: top-center }
    ${tables.join("\n    ")}
`;
}