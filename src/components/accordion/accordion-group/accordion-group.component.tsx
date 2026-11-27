import React, { useMemo, useCallback } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";

import Events from "../../../__internal__/utils/helpers/events";
import Accordion from "../accordion.component";
import { StyledAccordionGroup } from "../accordion.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import Logger from "../../../__internal__/utils/logger";
import getElementRef from "../../../__internal__/utils/helpers/get-element-ref";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";

type AccordionGroupChild =
  | React.ReactElement
  | boolean
  | null
  | undefined
  | Array<AccordionGroupChild>;

/**
 * @deprecated This component is deprecated and will be removed in a future release. Wrapping a group of Accordions in AccordionGroup is no longer required.
 */
export interface AccordionGroupProps extends MarginProps, TagProps {
  /** An Accordion or list of Accordion components to be rendered inside the AccordionGroup */
  children?: AccordionGroupChild;
}

let deprecatedWarnTriggered = false;

export const AccordionGroup = ({ children, ...rest }: AccordionGroupProps) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`AccordionGroup` is deprecated and will be removed in a future release. Wrapping a group of Accordions in AccordionGroup is no longer required.",
    );
  }

  const hasProperChildren = useMemo(() => {
    let hasAccordionChildren = true;

    React.Children.toArray(children).forEach((child) => {
      if (
        typeof child === "string" ||
        (React.isValidElement(child) &&
          (child.type as React.FunctionComponent).displayName !== "Accordion")
      ) {
        hasAccordionChildren = false;
      }
    });

    return hasAccordionChildren;
  }, [children]);

  invariant(
    hasProperChildren,
    `AccordionGroup accepts only children of type \`${Accordion.displayName}\`.`,
  );

  const filteredChildren = useMemo(
    () =>
      React.Children.toArray(children).filter((child) => {
        return React.isValidElement(child);
      }) as React.ReactElement<React.ComponentPropsWithRef<typeof Accordion>>[],
    [children],
  );

  const refs = useMemo(
    () => filteredChildren.map(() => React.createRef<HTMLDivElement>()),
    [filteredChildren],
  );
  const combinedRefs = useMemo(
    () =>
      filteredChildren.map((child, index) =>
        combineRefs(refs[index], getElementRef<HTMLDivElement>(child)),
      ),
    [filteredChildren, refs],
  );

  const focusAccordion = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>, index: number) => {
      ev.preventDefault();

      if (index === -1) {
        refs[refs.length - 1].current?.focus();
      } else if (index === refs.length) {
        refs[0].current?.focus();
      } else {
        refs[index].current?.focus();
      }
    },
    [refs],
  );

  const handleKeyboardAccessibility = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>, index: number) => {
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
    [focusAccordion, refs],
  );

  return (
    <StyledAccordionGroup {...rest} {...tagComponent("accordion-group", rest)}>
      {filteredChildren.map((child, index) =>
        React.cloneElement(child, {
          ref: combinedRefs[index],
          index,
          handleKeyboardAccessibility: (event) =>
            handleKeyboardAccessibility(event, index),
        }),
      )}
    </StyledAccordionGroup>
  );
};

AccordionGroup.displayName = "AccordionGroup";

export default AccordionGroup;
