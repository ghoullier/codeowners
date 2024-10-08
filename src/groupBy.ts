import type { Codeowners } from "./types.ts";

export function groupCodeownersBy(codeowners: Codeowners) {
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
