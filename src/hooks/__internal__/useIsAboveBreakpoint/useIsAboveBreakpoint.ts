import useMediaQuery from "../../useMediaQuery";

export default function useIsAboveBreakpoint(
  breakpoint?: number,
): boolean | undefined {
  const query = breakpoint ? `(min-width:${breakpoint}px)` : "";
  const matchesQuery = useMediaQuery(query);

  if (!query) {
    return undefined;
  }

  return matchesQuery;
}
