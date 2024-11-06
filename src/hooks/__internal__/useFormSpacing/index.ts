import { useContext } from "react";
import { MarginProps } from "styled-system";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import {
  FormSpacingContextProps,
  FormSpacingContext,
} from "../../../__internal__/form-spacing-provider";
import addFormSpacing from "./add-form-spacing";

export default (props: Record<string, unknown> | MarginProps) => {
  const { marginBottom } =
    useContext<FormSpacingContextProps>(FormSpacingContext);
  const marginProps = addFormSpacing(
    filterStyledSystemMarginProps(props),
    marginBottom,
  );

  return marginProps;
};
