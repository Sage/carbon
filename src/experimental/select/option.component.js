import React from 'react';
import { SelectValueContext } from './select.component';
import './option.style.scss';

const shouldBeVisible = (value, filter, id, label) => {
  let visible = false;
  if (Array.isArray(value) && value.length) {
    visible = value.filter(i => (i.id === id)).length === 0;
    if (visible === false) return false;
  }
  return filter ? label.toLowerCase().match(filter.toLowerCase()) : true;
}

const handleSelect = (onSelect, id, label) => () => onSelect({ id, label });

const Option = ({ children, id, label }) => (
  <SelectValueContext.Consumer>
    {
      ({ value, filter, onSelect }) => (
        shouldBeVisible(value, filter, id, label) && <div
          className='carbon-option'
          onClick={ handleSelect(onSelect, id, label) }
        >
          { children }
        </div>
      )
    }
  </SelectValueContext.Consumer>
);

export default Option;
