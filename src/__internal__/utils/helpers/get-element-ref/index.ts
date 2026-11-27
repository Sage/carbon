import { ReactElement } from "react";
import type { CombinedRef } from "../combine-refs";

/** Read React 18/19 elements without invoking either version's ref warning getter. */
export default function getElementRef<T>(
  element: ReactElement<unknown>,
): CombinedRef<T> {
  const propsRef = Object.getOwnPropertyDescriptor(element.props, "ref");
  if (propsRef && "value" in propsRef) return propsRef.value;

  const elementRef = Object.getOwnPropertyDescriptor(element, "ref");
  if (elementRef && "value" in elementRef) return elementRef.value;

  return undefined;
}
