import type { Codeowners } from "./types.ts";

/**
 * Grouped codeowners by path and owner
 */
type CodeownersGroupedBy = {
  /**
   * Indexed by owner map
   */
  byOwner: Map<string, Set<string>>;
  /**
   * Indexed by path map
   */
  byPath: Map<string, Set<string>>;
};

/**
 * Group a given codeowners struct by owner and path
 * @param {Codeowners} codeowners
 * @returns {CodeownersGroupedBy}
 */
export function groupCodeownersBy(codeowners: Codeowners): CodeownersGroupedBy {
  return codeowners.reduce(
    ({ byOwner, byPath }, [path, owners]) => {
      const value = byPath.get(path) ?? new Set();
      for (const owner of owners) {
        const paths = byOwner.get(owner) ?? new Set();
        paths.add(path);
        byOwner.set(owner, paths);
        value.add(owner);
      }
      byPath.set(path, value);
      return { byOwner, byPath };
    },
    {
      byOwner: new Map<string, Set<string>>(),
      byPath: new Map<string, Set<string>>(),
    },
  );
}
