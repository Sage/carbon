import PropTypes from "prop-types";
import React from "react";
import I18n from "i18n-js";
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
  StyledDeselectButton,
} from "./tile-select.style";

const TileSelect = (props) => {
  const {
    onChange,
    onBlur,
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
    ...rest
  } = props;

  const handleDeselect = () =>
    onChange({
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: null,
        checked: false,
      },
    });

  return (
    <StyledTileSelectContainer
      checked={checked}
      className={className}
      disabled={disabled}
      {...tagComponent("tile-select", props)}
    >
      <StyledTileSelectInput
        onChange={onChange}
        onBlur={onBlur}
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
          {title && <StyledTitle>{title}</StyledTitle>}

          {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}

          {titleAdornment && (
            <StyledAdornment>{titleAdornment}</StyledAdornment>
          )}
        </StyledTitleContainer>
        <StyledDescription>{description}</StyledDescription>
      </StyledTileSelect>
      {checked && (
        <StyledDeselectButton
          buttonType="tertiary"
          size="small"
          onClick={handleDeselect}
        >
          {I18n.t("tileSelect.deselect", { defaultValue: "Deselect" })}
        </StyledDeselectButton>
      )}
    </StyledTileSelectContainer>
  );
};

TileSelect.defaultProps = {
  checked: false,
  type: "checkbox",
};

TileSelect.propTypes = {
  /** title of the TileSelect */
  title: PropTypes.string,
  /** adornment to be rendered next to the title */
  titleAdornment: PropTypes.node,
  /** subtitle of the TileSelect */
  subtitle: PropTypes.string,
  /** description of the TileSelect */
  description: PropTypes.string,
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
  /** Callback triggered when the user blurrs this tile */
  onBlur: PropTypes.func,
  /** determines if this tile is selected or unselected */
  checked: PropTypes.bool,
  /** Custom classname passed to the root element of TileSelect */
  className: PropTypes.string,
  /** Type of the TileSelect input */
  type: PropTypes.oneOf(["radio", "checkbox"]),
};

TileSelect.displayName = "TileSelect";
export default TileSelect;
