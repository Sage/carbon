import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import StyledSearch, { StyledSearchButton, StyledButtonIcon } from './search.style';
import Icon from '../../../components/icon';
import Textbox from '../textbox';
import Button from '../../../components/button';

const Search = ({
  defaultValue,
  onChange,
  onClick,
  value,
  id,
  name,
  threshold,
  searchWidth,
  searchButton,
  placeholder,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  invariant(
    typeof initialValue === 'string',
    'This component has no initial value'
  );
  const [searchValue, setSearchValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(initialValue.length >= threshold);

  const iconType = useMemo(() => {
    const isSearchValueEmpty = searchValue.length === 0;
    const isFocusedOrActive = isFocused || searchIsActive;

    setSearchIsActive(searchValue.length >= threshold);

    if (!isSearchValueEmpty) {
      return 'cross';
    }

    if (!isFocusedOrActive || threshold === 0 || (!searchButton && isSearchValueEmpty)) {
      return 'search';
    }

    return '';
  }, [isFocused, searchIsActive, searchValue, threshold, searchButton]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    setSearchValue(e.target.value);
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  let buttonProps = {};
  if (searchButton && onClick) {
    buttonProps = {
      onClick: (ev) => {
        onClick({
          target: {
            name: ev.target.name,
            id: ev.target.id,
            value: searchValue
          }
        });
      }
    };
  }

  const handleIconClick = () => {
    setSearchValue('');
    if (onChange) {
      onChange({
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: ''
        }
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <StyledSearch
      searchWidth={ searchWidth }
      onFocus={ handleOnFocus }
      onClick={ handleOnFocus }
      onBlur={ handleBlur }
      onChange={ handleChange }
      isFocused={ isFocused }
      searchIsActive={ searchIsActive }
      id={ id }
      data-component='search'
      name={ name }
      searchHasValue={ searchValue && searchValue.length }
    >
      <Textbox
        { ...rest }
        placeholder={ placeholder }
        value={ searchValue }
        inputIcon={ iconType }
        iconOnClick={ handleIconClick }
      />
      {(searchButton && (
        <StyledSearchButton>
          {Boolean(isFocused || searchValue.length) && (
            <Button
              size='small'
              { ...buttonProps }
            >
              <StyledButtonIcon>
                <Icon type='search' />
              </StyledButtonIcon>
            </Button>
          )}
        </StyledSearchButton>
      ))}
    </StyledSearch>
  );
};

Search.propTypes = {
  /** Prop for `uncontrolled` use */
  defaultValue: PropTypes.string,
  /** Prop for `controlled` use */
  value: PropTypes.string,
  /** Prop for `onClick` events.
   * `onClick` events are triggered when the `searchButton` is clicked.  */
  onClick: PropTypes.func,
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `onKeyDown` events */
  onKeyDown: PropTypes.func,
  /** Prop boolean to state whether the `search` icon renders */
  searchButton: PropTypes.bool,
  /** Prop for specifing an input width length.
   * Leaving the `searchWidth` prop with no value will default the width to '100%' */
  searchWidth: PropTypes.string,
  /** Prop for `onBlur` events */
  onBlur: PropTypes.func,
  /** Prop for `id` events */
  id: PropTypes.string,
  /** Prop for `name` events */
  name: PropTypes.string,
  /** Prop for active search threshold. This must be a positive number. */
  threshold (props, propName) {
    let error;
    if (props[propName] && typeof props[propName] === 'number' && props[propName] < 0) {
      error = new Error('Threshold must be a positive number.');
    }
    return error;
  },
  /** Prop for a placeholder */
  placeholder: PropTypes.string
};

Search.defaultProps = { threshold: 3 };

export default Search;
