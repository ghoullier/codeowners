import { EOL } from "node:os";

function isCommentLine(line: string) {
  return line.trim().startsWith("#");
}

function isEmptyLine(line: string) {
  return line.trim().length === 0;
}

function parseLine(line: string) {
  const [path, ...owners] = line.trim().split(/\s+/);
  return [path, owners];
}

function parseContent(content: string) {
  return content
    .split(EOL)
    .filter((line) => !isCommentLine(line) && !isEmptyLine(line))
    .map((line) => parseLine(line));
}

export { parseContent, parseLine, isCommentLine, isEmptyLine };
