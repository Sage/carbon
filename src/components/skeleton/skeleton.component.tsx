import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { MarginProps } from "styled-system";
import {
  StyledSkeleton,
  StyledSkeletonLine,
  StyledSkeletonRow,
} from "./skeleton.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

export type Shapes = "circle" | "rectangle-curved" | "rectangle-moderate";

export type PresetHeight = "h1" | "h2" | "h3" | "h4" | "paragraph" | "button";

export interface SkeletonLine {
  /** Height of this line (overrides preset). */
  height?: string;
  /** Preset height for this line. */
  preset?: PresetHeight;
  /** Width of this line (e.g., "80%" or "200px"). */
  width?: string;
  /** Shape of this line (overrides the top-level shape). */
  shape?: Shapes;
}

export type SkeletonRow = SkeletonLine | SkeletonLine[];

export interface SkeletonProps extends MarginProps, TagProps {
  /** Array of rows. Each entry is either a single line object or an array of line objects rendered side by side. */
  lines?: SkeletonRow[];
  /** Sets the default shape for all lines. */
  shape?: Shapes;
  /** Removes animation, is true when prefer reduce-motion is on. */
  disableAnimation?: boolean;
}

const PRESET_HEIGHTS: Record<PresetHeight, string> = {
  h1: "38px",
  h2: "30px",
  h3: "26px",
  h4: "23px",
  paragraph: "21px",
  button: "40px",
};

const DEFAULT_LINES: SkeletonRow[] = [{}];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Skeleton = ({
  lines = DEFAULT_LINES,
  shape = "rectangle-moderate",
  disableAnimation,
  ...props
}: SkeletonProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marginProps = filterStyledSystemMarginProps(props);

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const resolvedDisableAnimation = disableAnimation || reduceMotion;

  const updateBackgroundGeometry = useCallback(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();

    if (!wrapperRect.width || !wrapperRect.height) return;

    const backgroundWidth = wrapperRect.width * 3;
    const backgroundHeight = wrapperRect.height;
    const startPosition = (wrapperRect.width - backgroundWidth) * 1.4;
    const endPosition = (wrapperRect.width - backgroundWidth) * -0.2;

    wrapper.style.setProperty(
      "--skeleton-background-width",
      `${backgroundWidth}px`,
    );
    wrapper.style.setProperty(
      "--skeleton-background-height",
      `${backgroundHeight}px`,
    );
    wrapper.style.setProperty(
      "--skeleton-background-start-x",
      `${startPosition}px`,
    );
    wrapper.style.setProperty(
      "--skeleton-background-end-x",
      `${endPosition}px`,
    );
    wrapper.style.setProperty("--skeleton-background-y", "0px");

    wrapper
      .querySelectorAll<HTMLElement>('[data-component="skeleton"]')
      .forEach((line) => {
        const lineRect = line.getBoundingClientRect();

        line.style.setProperty(
          "--skeleton-line-offset-x",
          `${lineRect.left - wrapperRect.left}px`,
        );
        line.style.setProperty(
          "--skeleton-line-offset-y",
          `${lineRect.top - wrapperRect.top}px`,
        );
      });
  }, []);

  useIsomorphicLayoutEffect(() => {
    updateBackgroundGeometry();

    const wrapper = wrapperRef.current;

    if (!wrapper || typeof ResizeObserver === "undefined") return undefined;

    const resizeObserver = new ResizeObserver(updateBackgroundGeometry);
    resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, [lines, shape, updateBackgroundGeometry]);

  const renderLine = (line: SkeletonLine, key: number) => {
    const resolvedHeight =
      line.height || (line.preset && PRESET_HEIGHTS[line.preset]);

    return (
      <StyledSkeletonLine
        data-role="skeleton-line"
        disableAnimation={resolvedDisableAnimation}
        key={key}
        height={resolvedHeight}
        width={line.width}
        shape={line.shape || shape}
        {...tagComponent("skeleton", props)}
      />
    );
  };

  const rows = lines.map((entry, i) => {
    const items = Array.isArray(entry) ? entry : [entry];

    return (
      <StyledSkeletonRow data-role="skeleton-row" key={i}>
        {items.map((line, j) => renderLine(line, j))}
      </StyledSkeletonRow>
    );
  });

  return (
    <StyledSkeleton
      data-role="skeleton-wrapper"
      ref={wrapperRef}
      {...marginProps}
    >
      {rows}
    </StyledSkeleton>
  );
};

export default Skeleton;
