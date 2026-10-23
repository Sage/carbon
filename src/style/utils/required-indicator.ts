import { css } from "styled-components";

export default ({
  font,
  disabled,
}: {
  font: string;
  disabled?: boolean;
}) => css`
  ::after {
    content: "*";
    display: inline;
    color: ${disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-required)"};
    font: ${font};
    margin-inline-start: var(--global-space-comp-xs);
  }
`;
