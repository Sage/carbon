import { useMemo } from "react";
import combineRefs, {
  CombinedRef,
} from "../../../__internal__/utils/helpers/combine-refs";

/** Call with a fixed number of refs, in a fixed order, as with hook dependencies. */
export default function useCombinedRefs<T>(...refs: CombinedRef<T>[]) {
  // Ref identities are the complete dependency list; the rest array itself is new each render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => combineRefs(...refs), refs);
}
