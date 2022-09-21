import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MarginProps } from "styled-system";

import Events from "../../../__internal__/utils/helpers/events";
import { StyledAccordionGroup } from "../accordion.style";
import ChildrenMapperProvider from "../../../__internal__/children-mapper-provider";

type AccordionGroupChild =
  | React.ReactElement
  | boolean
  | null
  | undefined
  | AccordionGroupChildArray;
// typescript-to-proptypes breaks on recursive type references so it has to be an interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccordionGroupChildArray extends Array<AccordionGroupChild> {}

interface AccordionChildProps {
  ref?: React.RefObject<HTMLDivElement>;
  index?: number;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>, index?: number) => void;
}

export interface AccordionGroupProps extends MarginProps {
  children?: AccordionGroupChild;
}

export const AccordionGroup = ({ children, ...rest }: AccordionGroupProps) => {
  const [registeredAccordions, setRegisteredAccordions] = useState<
    Array<[string, Record<string, unknown> | undefined]>
  >([]);
  const [childrenMap, setChildrenMap] = useState<
    Record<string, AccordionChildProps>
  >({});

  const refs = useMemo<React.RefObject<HTMLDivElement>[]>(
    () => registeredAccordions.map(() => React.createRef<HTMLDivElement>()),
    [registeredAccordions]
  );

  const focusAccordion = useCallback(
    (ev, index) => {
      ev.preventDefault();

      if (index === -1) {
        refs[refs.length - 1].current?.focus();
      } else if (index === refs.length) {
        refs[0].current?.focus();
      } else {
        refs[index].current?.focus();
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

  const updateChildrenMap = useCallback(
    (array) => {
      setChildrenMap(
        array.reduce(
          (
            acc: { [key: string]: AccordionChildProps },
            [id, childProps]: [
              string,
              { ref?: React.RefObject<HTMLDivElement> } | undefined
            ],
            index: number
          ) => {
            acc[id] = {
              ref: childProps?.ref || refs[index],
              index,
              onKeyDown: handleKeyboardAccessibility,
            };

            return acc;
          },
          {}
        )
      );
    },
    [refs, handleKeyboardAccessibility]
  );

  useEffect(() => {
    updateChildrenMap(registeredAccordions);
  }, [registeredAccordions, updateChildrenMap]);

  return (
    <ChildrenMapperProvider
      registeredChildren={registeredAccordions}
      setRegisteredChildren={setRegisteredAccordions}
      childrenMap={childrenMap}
    >
      <StyledAccordionGroup {...rest}>{children}</StyledAccordionGroup>
    </ChildrenMapperProvider>
  );
};

export default AccordionGroup;
