import { describe, expect, it } from "bun:test";

import { groupCodeownersBy } from "./groupBy.js";

describe("groupBy()", () => {
  it("should group by paths", () => {
    expect(
      groupCodeownersBy([
        ["apps/", ["@org/team1"]],
        ["packages/", ["@org/team2"]],
      ]),
    ).toMatchSnapshot();
  });
  it("should group by owners", () => {
    expect(
      groupCodeownersBy([
        ["apps/", ["@org/team1", "@org/team3"]],
        ["packages/", ["@org/team2"]],
        ["shared/", ["@org/team1", "@org/team2"]],
      ]),
    ).toMatchSnapshot();
  });
});
