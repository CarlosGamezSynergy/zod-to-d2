import { PropertyRelationship } from "../types/PropertyRelationship.type";
import { buildTextFile } from "./buildTextFile";

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