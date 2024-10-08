/**
 * Represent a parsed line codeowners file
 */
export type ParsedLine = [path: string, owners: string[]];

/**
 * Represent a list of parsed line of a codeowners file
 */
export type Codeowners = ParsedLine[];

/**
 * A specialized class that catch parsing eror
 */
export class ParseError extends Error {}
