/**
 * Simple object check.
 */
export function isObject(item: unknown) {
  return item && typeof item === "object" && !Array.isArray(item);
}

function merge(
  _target: Record<string, unknown>,
  ..._sources: Record<string, unknown>[]
): Record<string, unknown> {
  if (!_sources.length) return _target;
  const source = _sources.shift();

  if (isObject(_target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        merge(
          _target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      } else {
        Object.assign(_target, { [key]: source[key] });
      }
    }
  }
  return merge(_target, ..._sources);
}

/**
 * Deep merge two objects.
 */
export function mergeDeep(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
): Record<string, unknown> {
  // ensure function is not mutative
  const newTarget = JSON.parse(JSON.stringify(target));
  return merge(newTarget, ...sources);
}
