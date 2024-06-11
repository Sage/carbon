import React, { useRef } from "react";
import { CSSProperties } from "styled-components";
import { TagProps } from "__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import {
  StyledOptionGroupHeaderLabel,
  StyledOptionGroupHeader,
} from "./option-group-header.style";
import Icon, { IconProps } from "../../icon";

export interface OptionGroupHeaderProps extends TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
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
    { label, icon, style, id, ...rest }: OptionGroupHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const internalIdRef = useRef(id || guid());

    return (
      <StyledOptionGroupHeader
        style={style}
        id={internalIdRef.current}
        {...rest}
        ref={ref}
      >
        {icon && <Icon type={icon} />}
        <StyledOptionGroupHeaderLabel as="h2">
          {label}
        </StyledOptionGroupHeaderLabel>
      </StyledOptionGroupHeader>
    );
  }
);

OptionGroupHeader.displayName = "OptionGroupHeader";

export default OptionGroupHeader;
