import React, { useMemo, useCallback } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";

import Events from "../../../__internal__/utils/helpers/events";
import Accordion, {
  AccordionInternalProps,
  AccordionProps,
} from "../accordion.component";
import { StyledAccordionGroup } from "../accordion.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import Logger from "../../../__internal__/utils/logger";

type AccordionGroupChild =
  | React.ReactElement
  | boolean
  | null
  | undefined
  | AccordionGroupChildArray;
// typescript-to-proptypes breaks on recursive type references so it has to be an interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccordionGroupChildArray extends Array<AccordionGroupChild> {}

export interface AccordionGroupProps extends MarginProps, TagProps {
  /** An Accordion or list of Accordion components to be rendered inside the AccordionGroup */
  children?: AccordionGroupChild;
}

let deprecatedWarnTriggered = false;

export const AccordionGroup = ({ children, ...rest }: AccordionGroupProps) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      "`AccordionGroup` is deprecated and will soon be removed.",
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
      }) as React.FunctionComponentElement<
        AccordionProps & AccordionInternalProps
      >[],
    [children],
  );

  const refs = useMemo<React.RefObject<HTMLDivElement>[]>(
    () =>
      filteredChildren.map(
        (child) => child.ref || React.createRef<HTMLDivElement>(),
      ),
    [filteredChildren],
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
        // casted to ReactElement as there is no overload for an FunctionComponentElement in cloneElement
        React.cloneElement(child as React.ReactElement, {
          ref: refs[index],
          index,
          handleKeyboardAccessibility,
        }),
      )}
    </StyledAccordionGroup>
  );
};

AccordionGroup.displayName = "AccordionGroup";

export default AccordionGroup;
