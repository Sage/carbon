import React, { useRef, useCallback } from 'react';

import Events from '../../utils/helpers/events';
import Accordion from './accordion.component.js';

const AccordionGroup = ({ children }) => {
  const refs = useRef(React.Children.map(children, child => child.ref || React.createRef()));

  const focusAccordion = useCallback((ev, index) => {
    ev.preventDefault();
    if (index === -1) {
      refs.current[refs.current.length - 1].current.focus();
    } else if (index === refs.current.length) {
      refs.current[0].current.focus();
    } else {
      refs.current[index].current.focus();
    }
  }, [refs]);

  const handleKeyboardAccessibility = useCallback((ev, index) => {
    if (Events.isUpKey(ev)) {
      focusAccordion(ev, index - 1);
    }
    if (Events.isDownKey(ev)) {
      focusAccordion(ev, index + 1);
    }
    if (Events.isHomeKey(ev)) {
      focusAccordion(ev, 0);
    }
    if (Events.isEndKey(ev)) {
      focusAccordion(ev, refs.current.length - 1);
    }
  }, [focusAccordion]);

  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ref: refs.current[index],
      index,
      handleKeyboardAccessibility
    });
  });
};

AccordionGroup.propTypes = {
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (Accordion.displayName !== child.type.displayName) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${Accordion.displayName}\`.`);
      }
    });

    return error;
  }
};

export default AccordionGroup;
