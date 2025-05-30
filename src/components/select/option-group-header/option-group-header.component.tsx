import React, { useRef } from "react";
import { CSSProperties } from "styled-components";
import { TagProps } from "__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import Logger from "../../../__internal__/utils/logger";
import StyledOptionGroupHeader from "./option-group-header.style";
import Icon, { IconProps } from "../../icon";

export interface OptionGroupHeaderProps extends TagProps {
  /**
   * Unique identifier for the component.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** Heading text */
  label?: string;
  /** Any valid Carbon icon name */
  icon?: IconProps["type"];
  /**
   * @private
   * @ignore
   * object containing CSS styles to be passed to the underlying DOM element */
  style?: CSSProperties;
  /**
   * Content to be rendered inside the OptionGroupHeader.
   * When the `children` prop is passed it will take precedence over the `label` and
   * `icon` props meaning they will not be rendered */
  children?: React.ReactNode;
}

const OptionGroupHeader = React.forwardRef(
  (
    { label, icon, style, id, children, ...rest }: OptionGroupHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const internalIdRef = useRef(id || guid());

    if (!(children || label)) {
      Logger.warn(
        "OptionGroupHeader requires either a label or children to be provided",
      );
    }

    return (
      <StyledOptionGroupHeader
        style={style}
        id={internalIdRef.current}
        {...rest}
        ref={ref}
        data-component="option-group-header"
      >
        {children || (
          <>
            {icon && <Icon type={icon} />}
            <h4>{label}</h4>
          </>
        )}
      </StyledOptionGroupHeader>
    );
  },
);

OptionGroupHeader.displayName = "OptionGroupHeader";

export default OptionGroupHeader;
