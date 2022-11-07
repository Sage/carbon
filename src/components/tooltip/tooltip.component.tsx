import React from "react";
import Tippy from "@tippyjs/react/headless";
import { sticky, Placement } from "tippy.js";
import invariant from "invariant";

import StyledTooltip from "./tooltip.style";
import StyledPointer from "./tooltip-pointer.style";
import { TooltipPositions, TOOLTIP_POSITIONS } from "./tooltip.config";
import { ExplicitUnion } from "../../__internal__/utils/helpers/types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider/carbon-scoped-tokens-provider.component";

const TOOLTIP_DELAY = 100;
const tippyPlugins = [sticky];

type Attrs = {
  "data-placement": Placement;
  "data-reference-hidden"?: string;
  "data-escaped"?: string;
};

export type InputSizes = "small" | "medium" | "large";

export interface TooltipProps {
  /** The message to be displayed within the tooltip */
  message: React.ReactNode;
  /** The id attribute to use for the tooltip */
  id?: string;
  /** Whether to to show the Tooltip */
  isVisible?: boolean;
  /** Sets position of the tooltip */
  position?: ExplicitUnion<TooltipPositions>;
  /** Defines the message type */
  type?: string;
  /** Children elements */
  children: React.ReactElement;
  /** Defines the size of the tooltip content */
  size?: "medium" | "large";
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  bgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  fontColor?: string;
  /**
   * Overrides the default flip behaviour of the Tooltip,
   * must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  flipOverrides?: ExplicitUnion<TooltipPositions>[];
  /** @ignore @private */
  target?: Element;
  /** @ignore @private */
  isPartOfInput?: boolean;
  /** @ignore @private */
  inputSize?: InputSizes;
}

export const Tooltip = React.forwardRef<HTMLDivElement | null, TooltipProps>(
  (
    {
      children,
      isVisible,
      position = "top",
      message,
      type,
      size = "medium",
      isPartOfInput,
      inputSize,
      id,
      bgColor,
      fontColor,
      flipOverrides,
      target,
      ...rest
    }: TooltipProps,
    ref
  ) => {
    const isFlipOverridesValid =
      !flipOverrides ||
      (Array.isArray(flipOverrides) &&
        flipOverrides.every((placement) =>
          TOOLTIP_POSITIONS.includes(placement)
        ));

    invariant(
      isFlipOverridesValid,
      `The flipOverrides prop supplied to Tooltip must be an array containing some or all of ["top", "bottom", "left", "right"].`
    );

    const tooltip = (attrs: Attrs, content: React.ReactNode) => {
      const currentPosition = attrs["data-placement"] || position;

      return (
        <CarbonScopedTokensProvider>
          <StyledTooltip
            data-element="tooltip"
            role="tooltip"
            tabIndex={-1}
            type={type}
            size={size}
            id={id}
            {...tagComponent("tooltip", rest)}
            isPartOfInput={isPartOfInput}
            inputSize={inputSize}
            {...attrs}
            position={currentPosition}
            ref={ref}
            bgColor={bgColor}
            fontColor={fontColor}
          >
            <StyledPointer
              key="pointer"
              type={type}
              {...attrs}
              position={currentPosition}
              data-popper-arrow=""
              data-element="tooltip-pointer"
              bgColor={bgColor}
            />
            {content}
          </StyledTooltip>
        </CarbonScopedTokensProvider>
      );
    };

    return (
      <Tippy
        placement={position}
        delay={TOOLTIP_DELAY}
        {...(isVisible !== undefined && { visible: isVisible })}
        plugins={tippyPlugins}
        sticky
        render={(attrs) => tooltip(attrs, message)}
        reference={target}
        popperOptions={{
          modifiers: [
            ...(flipOverrides
              ? [
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: flipOverrides,
                    },
                  },
                ]
              : []),
            {
              name: "computeStyles",
              options: {
                gpuAcceleration: false,
              },
            },
          ],
        }}
      >
        {children}
      </Tippy>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
