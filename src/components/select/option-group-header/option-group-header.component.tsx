import React from "react";
import { CSSProperties } from "styled-components";
import StyledOptionGroupHeader from "./option-group-header.style";
import Icon, { IconProps } from "../../icon";

export interface OptionGroupHeaderProps {
  /** Heading text */
  label: string;
  /** Any valid Carbon icon name */
  icon?: IconProps["type"];
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying DOM element */
  style?: CSSProperties;
}

const OptionGroupHeader = React.forwardRef(
  (
    { label, icon, style, ...rest }: OptionGroupHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <StyledOptionGroupHeader style={style} {...rest} ref={ref}>
        {icon && <Icon type={icon} />}
        <h4>{label}</h4>
      </StyledOptionGroupHeader>
    );
  }
);

OptionGroupHeader.displayName = "OptionGroupHeader";

export default OptionGroupHeader;
