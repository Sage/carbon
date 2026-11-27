import type React from "react";
import type { OptionProps } from "../../option";

/** Properties inspected by select controls, shared by options and option rows. */
export type SelectOptionProps = Pick<
  OptionProps,
  "text" | "value" | "disabled" | "onClick" | "borderColor" | "variant" | "fill"
>;

export type SelectOptionElement = React.ReactElement<SelectOptionProps>;
