import React, { useEffect } from "react";
import { PaddingProps } from "styled-system";
import StyledTileFooter from "./tile-footer.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";
import { useTileContext } from "../__internal__/tile.context";

type DeprtecatedFooterVariant = "default" | "black" | "transparent" | "grey";
type FooterVariant = "selected" | "active";
export interface TileFooterProps extends PaddingProps, TagProps {
  children?: React.ReactNode;
  /** set which background color variant should be used */
  variant?: DeprtecatedFooterVariant | FooterVariant;
}

export const TileFooter = ({ variant, children, ...rest }: TileFooterProps) => {
  const { setHasFooter, setFooterVariant } = useTileContext();

  const actualVariant: FooterVariant | undefined =
    variant === "black"
      ? "selected"
      : variant === "selected" || variant === "active"
        ? variant
        : undefined;

  useEffect(() => {
    setHasFooter(true);
    setFooterVariant(actualVariant);

    return () => {
      setHasFooter(false);
      setFooterVariant(undefined);
    };
  }, [actualVariant, setFooterVariant, setHasFooter]);

  return (
    <StyledTileFooter
      variant={actualVariant}
      {...filterStyledSystemPaddingProps(rest)}
      {...tagComponent("tile-footer", rest)}
    >
      {children}
    </StyledTileFooter>
  );
};

export default TileFooter;
