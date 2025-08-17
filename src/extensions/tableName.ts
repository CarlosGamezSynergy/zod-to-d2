import * as z4 from "zod/v4/core";

export function tableName<T extends z4.$ZodObject>(this: T, name: string): T {
    const currentMetadata = z4.globalRegistry.get(this);

    if (currentMetadata) {
        currentMetadata.tableName = name;
        z4.globalRegistry.add(this, currentMetadata);
    } else {
        z4.globalRegistry.add(this, { tableName: name });
    }

    return this;
}