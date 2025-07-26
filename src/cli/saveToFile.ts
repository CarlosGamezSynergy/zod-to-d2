import { writeFile } from "node:fs/promises";

export async function saveToFile(
    filePath: string,
    content: string
): Promise<void> {
    await writeFile(filePath, content);
};