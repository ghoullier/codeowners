export type ParsedLine = [path: string, owners: string[]];
export type Codeowners = ParsedLine[];

export class ParseError extends Error {}
