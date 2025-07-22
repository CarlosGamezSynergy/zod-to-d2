import { PropertyRelationship } from "../types/PropertyRelationship.type";

export function buildRelationship(relationship: PropertyRelationship) {
    const { localProperty, foreignEntity, foreignEntityProperty } = relationship;

    return `
    ${localProperty} <-> ${foreignEntity}.${foreignEntityProperty}: {
        source-arrowhead: {shape: cf-many}
        target-arrowhead: {shape: cf-one-required}
    }
`;
}