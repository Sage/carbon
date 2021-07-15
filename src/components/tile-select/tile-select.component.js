import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import I18n from "i18n-js";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../utils/helpers/tags/tags";

import {
  StyledTileSelectContainer,
  StyledTileSelect,
  StyledTileSelectInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectWrapper,
  StyledFooterWrapper,
  StyledFocusWrapper,
  StyledTitleAndSubtitleWrapper,
  StyledActionButton,
} from "./tile-select.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const TileSelect = ({
  onChange,
  onBlur,
  onFocus,
  value,
  name,
  checked,
  className,
  disabled,
  title,
  subtitle,
  description,
  titleAdornment,
  type,
  id,
  customActionButton,
  actionButtonAdornment,
  footer,
  ...rest
}) => {
  const [hasFocus, setHasFocus] = useState(false);

  const handleDeselect = () =>
    onChange({
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: null,
        checked: false,
      },
    });

  const renderActionButton = () => {
    if (customActionButton) return customActionButton(handleDeselect);

    return (
      <StyledActionButton
        checked={checked}
        buttonType="tertiary"
        size="small"
        onClick={handleDeselect}
      >
        {I18n.t("tileSelect.deselect", { defaultValue: "Deselect" })}
      </StyledActionButton>
    );
  };

  useEffect(() => {
    if (disabled && hasFocus) {
      setHasFocus(false);
    }
  }, [disabled, hasFocus]);

  return (
    <StyledTileSelectContainer
      checked={checked}
      className={className}
      disabled={disabled}
      {...tagComponent("tile-select", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      <StyledFocusWrapper hasFocus={hasFocus} checked={checked}>
        <StyledTileSelectInput
          onChange={onChange}
          onBlur={(ev) => {
            setHasFocus(false);
            /* istanbul ignore else */
            if (onBlur) onBlur(ev);
          }}
          onFocus={(ev) => {
            setHasFocus(true);
            /* istanbul ignore else */
            if (onFocus) onFocus(ev);
          }}
          checked={checked}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          aria-checked={checked}
          id={id}
          {...rest}
        />
        <StyledTileSelect disabled={disabled} checked={checked}>
          <StyledTitleContainer>
            <div>
              <StyledTitleAndSubtitleWrapper>
                {title && (
                  <StyledTitle
                    {...(typeof title !== "string" && { as: "div" })}
                  >
                    {title}
                  </StyledTitle>
                )}

                {subtitle && (
                  <StyledSubtitle
                    {...(typeof subtitle !== "string" && { as: "div" })}
                  >
                    {subtitle}
                  </StyledSubtitle>
                )}
              </StyledTitleAndSubtitleWrapper>

              <StyledAdornment>{titleAdornment}</StyledAdornment>
            </div>

            <StyledDeselectWrapper hasActionAdornment={!!actionButtonAdornment}>
              {renderActionButton()}
              {actionButtonAdornment}
            </StyledDeselectWrapper>
          </StyledTitleContainer>
          <StyledDescription
            {...(typeof description !== "string" && { as: "div" })}
          >
            {description}
          </StyledDescription>
          {footer && <StyledFooterWrapper>{footer}</StyledFooterWrapper>}
        </StyledTileSelect>
      </StyledFocusWrapper>
    </StyledTileSelectContainer>
  );
};

TileSelect.defaultProps = {
  checked: false,
  type: "checkbox",
};

TileSelect.propTypes = {
  ...marginPropTypes,
  /** title of the TileSelect */
  title: PropTypes.node,
  /** adornment to be rendered next to the title */
  titleAdornment: PropTypes.node,
  /** subtitle of the TileSelect */
  subtitle: PropTypes.node,
  /** description of the TileSelect */
  description: PropTypes.node,
  /** disables the TileSelect input */
  disabled: PropTypes.bool,
  /** the value that is represented by this TileSelect */
  value: PropTypes.string,
  /** input id */
  id: PropTypes.string,
  /** input name */
  name: PropTypes.string,
  /** Callback triggered when user selects or deselects this tile */
  onChange: PropTypes.func,
  /** Callback triggered when the user blurs this tile */
  onBlur: PropTypes.func,
  /** Callback triggered when the user focuses this tile */
  onFocus: PropTypes.func,
  /** determines if this tile is selected or unselected */
  checked: PropTypes.bool,
  /** Custom class name passed to the root element of TileSelect */
  className: PropTypes.string,
  /** Type of the TileSelect input */
  type: PropTypes.oneOf(["radio", "checkbox"]),
  /** Render prop that allows overriding the default action button. `(onClick) => <Button onClick={onClick}>...</Button>` */
  customActionButton: PropTypes.func,
  /** An additional help info icon rendered next to the action button */
  actionButtonAdornment: PropTypes.node,
  /** footer of the TileSelect */
  footer: PropTypes.node,
};

TileSelect.displayName = "TileSelect";
export default TileSelect;
