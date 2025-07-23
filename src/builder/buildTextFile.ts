export function buildTextFile(lines: string[], indentLevel = 0): string {
    const indent = "\t".repeat(indentLevel);
    return lines.map(line => `${indent}${line}`).join("\n") + "\n";
}