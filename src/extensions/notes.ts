import * as z4 from "zod/v4/core";

export function notes<T extends z4.$ZodType>(this: T, ...notes: string[]): T {

    const currentMetadata = z4.globalRegistry.get(this);

    if (currentMetadata) {
        currentMetadata.notes = [...(currentMetadata.notes as string[] || []), ...notes];

        z4.globalRegistry.add(this, {
            ...currentMetadata
        });
    } else {
        z4.globalRegistry.add(this, {
            notes
        });
    }

    return this;
};
