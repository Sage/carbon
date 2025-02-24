import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";
import invariant from "invariant";
import {
  Placement,
  offset,
  flip,
  shift,
  arrow,
  limitShift,
  autoUpdate,
  useFloating,
} from "@floating-ui/react-dom";

import StyledTooltip from "./tooltip.style";
import StyledPointer from "./tooltip-pointer.style";
import { TooltipPositions, TOOLTIP_POSITIONS } from "./tooltip.config";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Portal from "../portal";

function preserveRef<ElementType>(
  ref: React.ForwardedRef<ElementType | null>,
  node: ElementType,
) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(node);
  }
  if (typeof ref === "object" && "current" in ref) {
    ref.current = node;
  }
}

const TOOLTIP_DELAY = 100;

export type InputSizes = "small" | "medium" | "large";

export interface TooltipProps {
  /** The message to be displayed within the tooltip */
  message: React.ReactNode;
  /** The id attribute to use for the tooltip */
  id?: string;
  /** Whether to to show the Tooltip */
  isVisible?: boolean;
  /** Sets position of the tooltip */
  position?: TooltipPositions;
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
  flipOverrides?: TooltipPositions[];
  /** @ignore @private */
  target?: HTMLElement;
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
      inputSize = "medium",
      id,
      bgColor,
      fontColor,
      flipOverrides,
      target,
      ...rest
    }: TooltipProps,
    ref,
  ) => {
    const targetInternalRef = useRef<HTMLElement | null>(null);

    const isControlled = isVisible !== undefined;

    const [isOpen, setIsOpen] = useState(false);

    let showTooltip = isOpen;
    if (isControlled) {
      showTooltip = isVisible;
    }

    const showDelayedTimeout = useRef<number | undefined>(undefined);
    const hideDelayedTimeout = useRef<number | undefined>(undefined);

    useEffect(() => {
      return () => {
        clearTimeout(showDelayedTimeout.current);
        clearTimeout(hideDelayedTimeout.current);
      };
    }, []);

    const show = useCallback(() => setIsOpen(true), []);

    const hide = useCallback(() => setIsOpen(false), []);

    const showDelayed = useCallback(() => {
      showDelayedTimeout.current = window.setTimeout(show, TOOLTIP_DELAY);
    }, [show]);

    const hideDelayed = useCallback(() => {
      hideDelayedTimeout.current = window.setTimeout(hide, TOOLTIP_DELAY);
    }, [hide]);

    useEffect(() => {
      const events = {
        mouseenter: showDelayed,
        mouseleave: hideDelayed,
        focus: show,
        blur: hide,
      };

      const targetElement = target || targetInternalRef.current;

      if (!isControlled) {
        Object.entries(events).forEach(([event, handler]) => {
          targetElement?.addEventListener(event, handler);
        });
      }

      return () => {
        if (!isControlled) {
          Object.entries(events).forEach(([event, handler]) => {
            targetElement?.removeEventListener(event, handler);
          });
        }
      };
    }, [children, show, showDelayed, hide, hideDelayed, isControlled, target]);

    const flipOverridesRef = useRef(flipOverrides);
    flipOverridesRef.current = flipOverrides;

    const arrowReference = useRef<HTMLDivElement | null>(null);

    const calculateOffset = useCallback(
      (placement: Placement) => {
        let mainAxisOffset = 9;

        if (isPartOfInput) {
          const offsets = {
            small: 5,
            medium: ["top", "bottom"].includes(placement) ? 6 : 8,
            large: ["top", "bottom"].includes(placement) ? 10 : 12,
          };
          mainAxisOffset = offsets[inputSize];
        }
        return mainAxisOffset;
      },
      [inputSize, isPartOfInput],
    );

    const defaultMiddleware = useMemo(
      () => [
        offset(({ placement }) => ({
          mainAxis: calculateOffset(placement),
        })),
        flip({
          fallbackPlacements: flipOverridesRef.current,
        }),
        shift({
          padding: 5,
          limiter: limitShift({
            offset: ({ rects }) => ({
              mainAxis: rects.reference.height,
            }),
          }),
        }),
        arrow({ element: arrowReference }),
      ],
      [calculateOffset, arrowReference],
    );

    const {
      x,
      y,
      reference,
      floating,
      strategy,
      placement: currentPlacement,
      middlewareData,
    } = useFloating({
      placement: position,
      middleware: defaultMiddleware,
      whileElementsMounted: autoUpdate,
    });
    const tooltipStyle = {
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
    };

    const handleTargetRef = useCallback(
      (node: HTMLElement) => {
        reference(target || node);
        targetInternalRef.current = node;
        preserveRef(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (children as any).ref as React.ForwardedRef<HTMLElement | null>,
          node,
        );
      },
      [reference, children, target],
    );

    const handleFloatingRef = useCallback(
      (node: HTMLDivElement) => {
        floating(node);
        preserveRef(ref, node);
      },
      [floating, ref],
    );

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[currentPlacement.split("-")[0]];

    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
    const arrowStyle = {
      left: arrowX,
      top: arrowY,
      [staticSide as Placement]: "-6px",
    };

    const isFlipOverridesValid =
      !flipOverrides ||
      (Array.isArray(flipOverrides) &&
        flipOverrides.every((placement) =>
          TOOLTIP_POSITIONS.includes(placement),
        ));

    invariant(
      isFlipOverridesValid,
      `The flipOverrides prop supplied to Tooltip must be an array containing some or all of ["top", "bottom", "left", "right"].`,
    );

    return (
      <>
        {React.cloneElement(children, {
          ref: handleTargetRef,
        })}

        {showTooltip ? (
          <Portal>
            <StyledTooltip
              data-element="tooltip"
              data-role="tooltip"
              role="tooltip"
              tabIndex={-1}
              type={type}
              size={size}
              id={id}
              {...tagComponent("tooltip", rest)}
              ref={handleFloatingRef}
              bgColor={bgColor}
              fontColor={fontColor}
              style={tooltipStyle}
              data-placement={currentPlacement}
            >
              <StyledPointer
                type={type}
                ref={arrowReference}
                data-element="tooltip-pointer"
                data-role="tooltip-pointer"
                bgColor={bgColor}
                style={arrowStyle}
              />
              {message}
            </StyledTooltip>
          </Portal>
        ) : null}
      </>
    );
  },
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
