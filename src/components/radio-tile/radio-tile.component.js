import PropTypes from 'prop-types';
import React from 'react';
import I18n from 'i18n-js';
import tagComponent from '../../utils/helpers/tags/tags';

import {
  StyledRadioTileContainer,
  StyledRadioTile,
  StyledRadioTileInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectButton
} from './radio-tile.style';

const RadioTile = (props) => {
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
    id,
    ...rest
  } = props;

  const handleDeselect = () => onChange({
    target: {
      ...(name && { name }),
      ...(id && { id }),
      value: null,
      checked: false
    }
  });

  return (
    <StyledRadioTileContainer
      checked={ checked }
      className={ className }
      { ...tagComponent('radio-tile', props) }
    >
      <StyledRadioTileInput
        onChange={ onChange }
        onBlur={ onBlur }
        checked={ checked }
        name={ name }
        type='radio'
        role='radio'
        value={ value }
        disabled={ disabled }
        aria-checked={ checked }
        id={ id }
        { ...rest }
      />
      <StyledRadioTile disabled={ disabled } checked={ checked }>
        <StyledTitleContainer>
          <StyledTitle>
            {title}
          </StyledTitle>
          <StyledSubtitle>
            {subtitle}
          </StyledSubtitle>
          <StyledAdornment>
            {titleAdornment}
          </StyledAdornment>
        </StyledTitleContainer>
        <StyledDescription>
          {description}
        </StyledDescription>
      </StyledRadioTile>
      {checked && (
        <StyledDeselectButton
          buttonType='tertiary'
          size='small'
          onClick={ handleDeselect }
        >
          {I18n.t('radioTile.deselect', { defaultValue: 'Deselect' })}
        </StyledDeselectButton>
      ) }
    </StyledRadioTileContainer>
  );
};

RadioTile.defaultProps = {
  checked: false,
  onChange: null
};

RadioTile.propTypes = {
  /** title of the RadioTile */
  title: PropTypes.string,
  /** adornment to be rendered next to the title */
  titleAdornment: PropTypes.node,
  /** subtitle of the RadioTile */
  subtitle: PropTypes.string,
  /** description of the RadioTile */
  description: PropTypes.string,
  /** disables the RadioTile input */
  disabled: PropTypes.bool,
  /** the value that is represented by this RadioTile */
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
  /** Custom classname passed to the root element of RadioTile */
  className: PropTypes.string
};

RadioTile.displayName = 'RadioTile';
export default RadioTile;
