import React, { useMemo, useCallback } from "react";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../utils/helpers/events";
import Accordion from "./accordion.component.js";
import { StyledAccordionGroup } from "./accordion.style.js";

const marginProptypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const AccordionGroup = ({ children, ...rest }) => {
  const filteredChildren = useMemo(() => React.Children.toArray(children), [
    children,
  ]);

  const refs = useMemo(
    () => filteredChildren.map((child) => child.ref || React.createRef()),
    [filteredChildren]
  );

  const focusAccordion = useCallback(
    (ev, index) => {
      ev.preventDefault();
      if (index === -1) {
        refs[refs.length - 1].current.focus();
      } else if (index === refs.length) {
        refs[0].current.focus();
      } else {
        refs[index].current.focus();
      }
    },
    [refs]
  );

  const handleKeyboardAccessibility = useCallback(
    (ev, index) => {
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
        focusAccordion(ev, refs.length - 1);
      }
    },
    [focusAccordion, refs]
  );

  return (
    <StyledAccordionGroup {...rest}>
      {filteredChildren.map((child, index) =>
        React.cloneElement(child, {
          ref: refs[index],
          index,
          handleKeyboardAccessibility,
        })
      )}
    </StyledAccordionGroup>
  );
};

AccordionGroup.propTypes = {
  ...marginProptypes,
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (!child) {
        return;
      }

      if (Accordion.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${Accordion.displayName}\`.`
        );
      }
    });

    return error;
  },
};

export default AccordionGroup;
