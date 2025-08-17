import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Ensures that the directory for a given file path exists, creating it if necessary.
 * @param filePath The full path to the file.
 */
export async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = dirname(filePath);
  // This will create the directory and all its parents.
  // It does nothing if the directory already exists.
  // It will throw an error for permissions issues or if a file exists with the same name.
  await mkdir(dir, { recursive: true });
}
