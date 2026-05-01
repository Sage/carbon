import { useLayoutEffect, useCallback, useState, useEffect } from "react";
import { getWindow } from "../../__internal__/dom/globals";

type Listener = () => void;

// Changes to this should be treated as a breaking change
export interface QueryEntry {
  mediaQueryList: MediaQueryList;
  listeners: Set<Listener>;
  nativeHandler: () => void;
  refCount: number;
}

const browserWindow = getWindow();
// Can't have a guard against window being undefined. It could lead to uneven hook
// calls if the window is not available on first render but becomes available later.
// There is a guard to make the hooks noop but useLayoutEffect throws warnings in SSR
// which causes tests to fail
const useIsomorphicLayoutEffect = browserWindow ? useLayoutEffect : useEffect;
const CACHE_KEY = "__CARBON_INTERNALS_MEDIA_QUERY_CACHE" as const;

const getQueryCache = (windowObject: Window): Map<string, QueryEntry> => {
  if (!windowObject[CACHE_KEY]) {
    windowObject[CACHE_KEY] = new Map<string, QueryEntry>();
  }

  return windowObject[CACHE_KEY];
};

const getOrCreateEntry = (
  query: string,
  windowObject: Window,
): { entry: QueryEntry; cache: Map<string, QueryEntry> } => {
  const cache = getQueryCache(windowObject);
  const existing = cache.get(query);

  /* if the query already exists do not add again, just return the existing entry */
  if (existing) {
    return { entry: existing, cache };
  }

  /* create a new entry for this media query */
  const mediaQueryList = windowObject.matchMedia(query);
  const entry: QueryEntry = {
    mediaQueryList,
    listeners: new Set(),
    nativeHandler: () => {
      entry.listeners.forEach((l) => l());
    },
    refCount: 0,
  };
  mediaQueryList.addEventListener("change", entry.nativeHandler);
  cache.set(query, entry);

  return { entry, cache };
};

const subscribe = (
  query: string,
  listener: Listener,
  windowObject: Window,
): { matches: boolean; unsubscribe: () => void } => {
  const { entry, cache } = getOrCreateEntry(query, windowObject);
  entry.refCount += 1;
  entry.listeners.add(listener);

  return {
    matches: entry.mediaQueryList.matches,
    unsubscribe: () => {
      entry.listeners.delete(listener);
      entry.refCount -= 1;

      if (!entry.refCount) {
        entry.mediaQueryList.removeEventListener("change", entry.nativeHandler);
        cache.delete(query);
      }
    },
  };
};

export default (queryInput: string): boolean | undefined => {
  const query = queryInput?.replace(/^@media( ?)/m, "");
  const [match, setMatch] = useState<boolean | undefined>(undefined);

  const updateMatch = useCallback(() => {
    /* istanbul ignore if */
    if (!browserWindow) {
      return;
    }

    const cache = getQueryCache(browserWindow);
    const entry = cache.get(query);

    /* istanbul ignore else */
    if (entry) {
      setMatch(entry.mediaQueryList.matches);
    }
  }, [query]);

  useIsomorphicLayoutEffect(() => {
    /* istanbul ignore if */
    if (!browserWindow || !query) {
      return undefined;
    }

    const { matches, unsubscribe } = subscribe(
      query,
      updateMatch,
      browserWindow,
    );
    setMatch(matches);

    return unsubscribe;
  }, [query, updateMatch]);

  return match;
};
