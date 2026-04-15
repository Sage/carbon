import { useLayoutEffect, useCallback, useState } from "react";
import { getWindow } from "../../__internal__/dom/globals";

type Listener = () => void;

interface QueryEntry {
  mediaQueryList: MediaQueryList;
  listeners: Set<Listener>;
  nativeHandler: () => void;
  refCount: number;
}

/* Module scoped cache of media query entries */
const queryCache = new Map<string, QueryEntry>();

const getOrCreateEntry = (query: string, browserWindow: Window): QueryEntry => {
  const existing = queryCache.get(query);
  /* if the query already exists do not add again, just return the existing entry */
  if (existing) {
    return existing;
  }

  /* create a new entry for this media query */
  const mediaQueryList = browserWindow.matchMedia(query);
  const entry: QueryEntry = {
    mediaQueryList,
    listeners: new Set(),
    nativeHandler: () => {
      entry.listeners.forEach((l) => l());
    },
    refCount: 0,
  };
  mediaQueryList.addEventListener("change", entry.nativeHandler);
  queryCache.set(query, entry);

  return entry;
};

const subscribe = (
  query: string,
  listener: Listener,
  window: Window,
): (() => void) => {
  /* Add or get entry, increase the reference count and add the listener */
  const entry = getOrCreateEntry(query, window);
  entry.refCount += 1;
  entry.listeners.add(listener);

  return () => {
    entry.listeners.delete(listener);
    entry.refCount -= 1;

    /* remove the native event listener and delete from the cache if no more listeners for query */
    if (!entry.refCount) {
      entry.mediaQueryList.removeEventListener("change", entry.nativeHandler);
      queryCache.delete(query);
    }
  };
};

export default (queryInput: string): boolean | undefined => {
  const browserWindow = getWindow();
  if (!queryInput || !browserWindow) {
    return undefined;
  }

  const query = queryInput.replace(/^@media( ?)/m, "");

  const [match, setMatch] = useState<boolean | undefined>(undefined);

  const updateMatch = useCallback(() => {
    const entry = queryCache.get(query);

    /* istanbul ignore else */
    if (entry) {
      setMatch(entry.mediaQueryList.matches);
    }
  }, [query]);

  useLayoutEffect(() => {
    getOrCreateEntry(query, browserWindow);
    updateMatch();

    return subscribe(query, updateMatch, browserWindow);
  }, [query, updateMatch, browserWindow]);

  return match;
};
