import {
  padding as convertPaddingPropsToCSS,
  PaddingProps,
} from "styled-system";

interface PaddingValues {
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
}

function resolvePaddingSides(props: PaddingProps) {
  const expandShorthand = (cssValue: string) => {
    const sideValues = cssValue.split(/\s+/);
    const [
      paddingTop,
      paddingRight = paddingTop,
      paddingBottom = paddingTop,
      paddingLeft = paddingRight,
    ] = sideValues;

    return { paddingTop, paddingBottom, paddingLeft, paddingRight };
  };

  const {
    padding,
    ...individualSides
  }: PaddingValues = convertPaddingPropsToCSS(props);

  if (padding)
    return {
      ...expandShorthand(padding),
      ...individualSides,
    };

  return individualSides;
}

export default resolvePaddingSides;
