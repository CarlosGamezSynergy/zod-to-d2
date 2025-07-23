import { promises as fs } from 'node:fs';
import * as path from 'node:path';

export async function scanDirectory(directory: string): Promise<string[]> {
    try {
        const files = await fs.readdir(directory, {
            recursive: true,
            withFileTypes: true
        });

        const filteredFiles = files.filter(file => file.isFile());
        const filePaths = filteredFiles.map(file => path.join(file.parentPath, file.name));
        return filePaths;
    } catch (error) {
        return [];
    }
}