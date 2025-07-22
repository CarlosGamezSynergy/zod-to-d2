export function buildDiagram(title: string, diagramElements: string[]) {
    return `
    direction: down
    title: |md ${title} | { near: top-center }
    ${diagramElements.join("\n    ")}
`;
}