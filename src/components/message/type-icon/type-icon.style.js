import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticNeutral500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
};

const TypeIconStyle = styled.div`
  align-items: center;
  background-color: ${({ variant }) => messageVariants[variant]};
  display: flex;
  justify-content: center;
  line-height: 100%;
  min-width: 30px;
  text-align: center;
  span {
    &:before {
      color: var(--colorsUtilityYang100);
    }
  }

  ${({ transparent, variant }) =>
    transparent &&
    css`
      background-color: transparent;
      span {
        &:before {
          color: ${messageVariants[variant]};
        }
      }
    `}
`;

TypeIconStyle.defaultProps = {
  variant: "info",
  transparent: false,
};

TypeIconStyle.propTypes = {
  variant: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
  border: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default TypeIconStyle;
