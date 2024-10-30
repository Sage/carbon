import React, { CSSProperties } from "react";
import { TagProps } from "__internal__/utils/helpers/tags";
import StyledOptionGroup from "./option-group.style";
import { IconProps } from "../../icon";
import OptionGroupHeader from "../option-group-header";
import type { OptionProps } from "../option";
import type { OptionRowProps } from "../option-row";

export interface OptionGroupProps extends Omit<TagProps, "data-component"> {
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

const OptionGroup = React.forwardRef(({
  style,
  icon,
  label,
  id,
  children,
  ...rest
}: OptionGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const clonedChildren = React.Children.map(children, (child) => {
    return React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<OptionProps | OptionGroupProps>, { isInGroup: true }) : child;
  });
  return (
    <StyledOptionGroup role="group" data-component="option-group" ref={ref} style={style} {...rest}>
      <OptionGroupHeader icon={icon} id={id}>
        {label}
      </OptionGroupHeader>
      {clonedChildren}
    </StyledOptionGroup>
  );
});

OptionGroup.displayName = "OptionGroup";
export default OptionGroup;
