import { buildTextFile } from "./buildTextFile";

export function buildDiagram(title: string, diagramElements: string[]) {
    let diagram = "";

    diagram += buildTextFile([
        'direction: down',
        'title: |md ${title} | { near: top-center }',
        ...diagramElements
    ]);

    return diagram;
}