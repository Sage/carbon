import { MarginProps } from "styled-system";

export default (marginProps: MarginProps, formMarginBottom?: string) => {
  if (!formMarginBottom) {
    return marginProps;
  }
  const copiedProps = { ...marginProps };

  const { mb, marginBottom, mt, marginTop, my, marginY, m, margin } =
    copiedProps;
  const hasCustomMarginBottom = [mb, marginBottom, my, marginY, m, margin].some(
    (prop) => prop !== undefined,
  );
  const hasCustomMarginTop = [mt, marginTop, my, marginY, m, margin].some(
    (prop) => prop !== undefined,
  );

  if (!hasCustomMarginBottom) {
    copiedProps.mb = formMarginBottom;
  }

  if (!hasCustomMarginTop) {
    copiedProps.mt = 0;
  }

  return copiedProps;
};
