import React from 'react';
import PropTypes from 'prop-types';
import StyledOption from './option.style';

const Option = ({
  text,
  children,
  onSelect,
  value,
  isHighlighted
}) => {
  function handleClick() {
    onSelect({ text, value });
  }

  return (
    <StyledOption
      aria-selected={ isHighlighted }
      data-component='option'
      onClick={ handleClick }
      isHighlighted={ isHighlighted }
      role='option'
    >
      { children || text }
    </StyledOption>
  );
};

Option.propTypes = {
  /** The option's visible text, displayed within Textbox of Select, and used for filtering */
  text: PropTypes.string.isRequired,
  /** Optional: alternative rendered content, displayed within SelectList of Select (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /**
   * @private
   * @ignore
   * Callback to return value when the element is selected (prop added by the SelectList component) */
  onSelect: PropTypes.func,
  /**
   * @private
   * @ignore
   * True if the option is highlighted (prop added by the SelectList component) */
  isHighlighted: PropTypes.bool
};

export default Option;
