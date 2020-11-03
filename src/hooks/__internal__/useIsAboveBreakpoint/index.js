import useMediaQuery from "../../useMediaQuery";

export default function useIsAboveBreakpoint(breakpoint) {
  const matchesQuery = useMediaQuery(`(min-width:${breakpoint}px)`);
  if (!breakpoint) return undefined;
  return matchesQuery;
}
