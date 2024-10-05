import { EOL } from "node:os";

import { type Codeowners, ParseError, type ParsedLine } from "./types.js";

/**b
 * Test if a line is a comment
 * @param {string} line
 * @returns {boolean}
 */
function isCommentLine(line: string): boolean {
  return line.trim().startsWith("#");
}

/**
 * Test if a line is empty
 * @param {string} line
 * @returns {boolean}
 */
function isEmptyLine(line: string): boolean {
  return line.trim().length === 0;
}

/**
 * Parse a CODEOWNERS line
 * @param {string} line
 * @returns {ParsedLine}
 */
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

/**
 * Parse string based CODEOWNERS content
 * @param {string} content
 * @returns {Codeowners}
 */
function parseContent(content: string): Codeowners {
  return content
    .split(EOL)
    .filter((line) => !isCommentLine(line) && !isEmptyLine(line))
    .map((line) => parseLine(line));
}

export { parseContent, parseLine, isCommentLine, isEmptyLine, ParseError };
