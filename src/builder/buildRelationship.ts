import { type PropertyRelationship } from "../types/PropertyRelationship.type.js";
import { buildTextFile } from "./buildTextFile.js";

export function buildRelationship(relationship: PropertyRelationship) {
    const { localProperty, foreignEntity, foreignEntityProperty } = relationship;

    let output = "";

    output += buildTextFile([
        `${localProperty} <-> ${foreignEntity}.${foreignEntityProperty}: {`,
    ])

    output += buildTextFile([
        'source-arrowhead: {shape: cf-many}',
        'target-arrowhead: {shape: cf-one-required}',
    ], 1);

    output += buildTextFile([
        '}',
    ]);

    return output;
}