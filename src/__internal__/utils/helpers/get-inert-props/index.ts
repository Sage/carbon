import { version, type HTMLAttributes } from "react";

// React 18 forwards unknown DOM attributes as strings; React 19 treats inert as
// a boolean attribute. Keep the rendered attribute identical, including for SSR.
const enabledValue = Number.parseInt(version, 10) >= 19 ? true : "";

type InertProps = Pick<
  HTMLAttributes<HTMLElement>,
  Extract<"inert", keyof HTMLAttributes<HTMLElement>>
>;

export default function getInertProps(inert: boolean): InertProps {
  // React 18's types do not declare inert. React 19's types declare a boolean.
  // This internal bridge supplies the representation for the active runtime
  // without augmenting consumers' React interfaces.
  return { inert: inert ? enabledValue : undefined } as InertProps;
}
