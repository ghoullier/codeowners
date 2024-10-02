import { EOL } from "node:os";

type ParsedLine = [path: string, owners: string[]];
type Codeowners = ParsedLine[];

class ParseError extends Error {}

function isCommentLine(line: string): boolean {
  return line.trim().startsWith("#");
}

function isEmptyLine(line: string): boolean {
  return line.trim().length === 0;
}

function parseLine(line: string): ParsedLine {
  const [path, ...owners] = line.trim().split(/\s+/);
  if (!path) {
    throw new ParseError("Invalid path");
  }
  if (owners.length === 0) {
    throw new ParseError(`No codeowners for "${path}"`);
  }
  return [path, owners];
}

function parseContent(content: string): Codeowners {
  return content
    .split(EOL)
    .filter((line) => !isCommentLine(line) && !isEmptyLine(line))
    .map((line) => parseLine(line));
}

export { parseContent, parseLine, isCommentLine, isEmptyLine, ParseError };
