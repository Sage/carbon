import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDl, StyledDlPair } from "./definition-list.style";
import { DlProvider } from "./__internal__/dl.context";
import { groupPairs, isComponent } from "./__internal__/utils";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import Dt from "./dt/dt.component";

type ElementAlignment = "left" | "center" | "right";
export type DefinitionListSpacing = "small" | "medium";

export interface DlProps extends SpaceProps, TagProps {
  /** HTML id attribute of the definition list. */
  id?: string;
  /** prop to render children. */
  children: React.ReactNode;
  /** Width of the term column as a percentage. Has no effect when `asSingleColumn` is set. */
  w?: number;
  /** Render the DefinitionList as a single column */
  asSingleColumn?: boolean;
  /** Sets the vertical spacing between definition pairs. */
  spacing?: DefinitionListSpacing;
  /** Renders a divider between definition pairs. */
  divider?: boolean;
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign?: ElementAlignment;
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign?: ElementAlignment;
}

const Dl = ({
  children,
  w = 50,
  dtTextAlign = "left",
  ddTextAlign = "left",
  asSingleColumn = false,
  spacing = "medium",
  divider = false,
  ...rest
}: DlProps) => {
  const pairs = groupPairs(children);
  const lastPairIndex = pairs.reduce(
    (lastIndex, pair, index) => (isComponent(pair[0], Dt) ? index : lastIndex),
    -1,
  );

  return (
    <StyledDl {...rest} {...tagComponent("dl", rest)}>
      <DlProvider
        value={{
          asSingleColumn,
          dtTextAlign,
          ddTextAlign,
        }}
      >
        {pairs.map((pair, index) => {
          const isPair = isComponent(pair[0], Dt);
          const pairKey =
            React.isValidElement(pair[0]) && pair[0].key != null
              ? pair[0].key
              : index;

          if (!isPair) return pair[0];

          return (
            <StyledDlPair
              asSingleColumn={asSingleColumn}
              data-role="dl-pair"
              divider={divider}
              isLast={index === lastPairIndex}
              key={pairKey}
              spacing={spacing}
              w={w}
            >
              {pair}
            </StyledDlPair>
          );
        })}
      </DlProvider>
    </StyledDl>
  );
};

Dl.displayName = "Dl";
export default Dl;
