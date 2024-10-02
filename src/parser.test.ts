import { describe, expect, it } from "bun:test";
import {
  isCommentLine,
  isEmptyLine,
  parseContent,
  parseLine,
} from "./parser.js";

describe("parseContent()", () => {
  it("should ignore comments", () => {
    expect(
      parseContent(`
        # Hello    
    `),
    ).toStrictEqual([]);
  });
  it("should ignore comments", () => {
    expect(
      parseContent(`
        # Hello    
        package.json    @org/team
    `),
    ).toStrictEqual([["package.json", ["@org/team"]]]);
  });
  it("should support multiple owners", () => {
    expect(
      parseContent(`
        # Hello    
        package.json    @org/team1 @org/team2
    `),
    ).toStrictEqual([["package.json", ["@org/team1", "@org/team2"]]]);
  });
});

describe("parseLine()", () => {
  it("should support multiple owners", () => {
    expect(parseLine("package.json @org/team1 @org/team2")).toStrictEqual([
      "package.json",
      ["@org/team1", "@org/team2"],
    ]);
  });
  it("should support extra spaces", () => {
    expect(
      parseLine("package.json    @org/team1      @org/team2"),
    ).toStrictEqual(["package.json", ["@org/team1", "@org/team2"]]);
  });
});

describe("isCommentLine()", () => {
  it("should support extra space", () => {
    expect(isCommentLine("  # Hello    ")).toBeTrue();
  });
  it("should support start with #", () => {
    expect(isCommentLine("# Hello")).toBeTrue();
  });
  it("should detect valid lines", () => {
    expect(isCommentLine("hello")).toBeFalse();
  });
  it("should detect empty lines", () => {
    expect(isCommentLine("")).toBeFalse();
  });
});

describe("isEmptyLine()", () => {
  it("should support extra space", () => {
    expect(isEmptyLine("  ")).toBeTrue();
  });
  it("should detect empty lines", () => {
    expect(isEmptyLine("")).toBeTrue();
  });
  it("should detect valid lines", () => {
    expect(isEmptyLine(" hello  ")).toBeFalse();
  });
});
