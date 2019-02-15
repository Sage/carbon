/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  const merge = (_target, ..._sources) => {
    if (!_sources.length) return _target;
    const source = _sources.shift();

    if (isObject(_target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          merge(_target[key], source[key]);
        } else {
          Object.assign(_target, { [key]: source[key] });
        }
      }
    }
    return merge(_target, ..._sources);
  };
  // ensure function is not mutative
  const newTarget = JSON.parse(JSON.stringify(target));
  return merge(newTarget, ...sources);
}
