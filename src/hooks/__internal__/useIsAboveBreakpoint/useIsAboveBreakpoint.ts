import useMediaQuery from "../../useMediaQuery";

export default function useIsAboveBreakpoint(
  breakpoint?: number,
): boolean | undefined {
  const matchesQuery = useMediaQuery(`(min-width:${breakpoint}px)`);
  if (!breakpoint) return undefined;
  return matchesQuery;
}
