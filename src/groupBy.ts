import type { Codeowners } from "./types.ts";

type CodeownersGroupedBy = {
  byOwner: Map<string, Set<string>>;
  byPath: Map<string, Set<string>>;
};

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
