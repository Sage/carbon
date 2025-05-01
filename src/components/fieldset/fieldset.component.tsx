import React, { useState, useEffect, useContext } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { FieldsetStyle, StyledLegend } from "./fieldset.style";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Logger from "../../__internal__/utils/logger";

export interface FieldsetProps extends MarginProps, TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The text for the fieldset's legend element. */
  legend?: string;
  /** Flag to configure fields as mandatory. */
  required?: boolean;
  /**
   * [Legacy] Flag to configure component as optional.
   * @deprecated If the value of this component is not required, use the `required` prop and set it to false instead.
   */
  isOptional?: boolean;
}

let deprecateOptionalWarnTriggered = false;

export const Fieldset = ({
  children,
  legend,
  required,
  isOptional,
  ...rest
}: FieldsetProps) => {
  if (!deprecateOptionalWarnTriggered && isOptional) {
    deprecateOptionalWarnTriggered = true;
    Logger.deprecate(
      "`isOptional` is deprecated in Fieldset and support will soon be removed. If the value of this component is not required, use the `required` prop and set it to false instead.",
    );
  }
  const [ref, setRef] = useState<HTMLFieldSetElement | null>(null);
  const marginProps = filterStyledSystemMarginProps(rest);
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const locale = useLocale();
  const optionalLabel = locale.label.optional();

  useEffect(() => {
    if (ref && required) {
      Array.from(
        ref.querySelectorAll("input") || /* istanbul ignore next */ [],
      ).forEach((el) => {
        el.setAttribute("required", "");
      });
    }
  }, [ref, required]);

  return (
    <FieldsetStyle
      ref={setRef}
      newValidation={validationRedesignOptIn}
      {...rest}
      {...marginProps}
      {...tagComponent("fieldset", rest)}
    >
      {legend && (
        <StyledLegend
          data-element="legend"
          isRequired={required}
          isOptional={isOptional}
          optionalLabel={optionalLabel}
        >
          {legend}
        </StyledLegend>
      )}
      {children}
    </FieldsetStyle>
  );
};

Fieldset.displayName = "Fieldset";

export default Fieldset;
