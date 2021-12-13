import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const LabelStyle = styled.label`
  color: var(--colorsYin090);
  display: block;
  font-weight: 600; //TODO: (tokens) use token var(--fontWeights500)

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        color: var(--colorsSemanticNegative500);
        font-weight: 700;
        margin-left: var(--spacing100);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--colorsYin030);
    `}
`;

LabelStyle.propTypes = {
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${({ align, inline, pr, pl, width }) =>
    inline &&
    css`
      box-sizing: border-box;
      margin-bottom: 0;
      ${pr &&
      css`
        padding-right: var(${pr === 1 ? "--spacing100" : "--spacing200"});
      `};
      ${pl &&
      css`
        padding-left: var(${pl === 1 ? "--spacing100" : "--spacing200"});
      `};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
      width: ${width === 0 ? StyledLabelContainer.defaultProps.width : width}%;
    `}

  ${({ optional }) =>
    optional &&
    css`
      ::after {
        content: "(optional)";
        font-weight: 350; //TODO: (tokens) use token var(--fontWeights400)
        margin-left: 4px;
      }
    `}
`;

StyledLabelContainer.defaultProps = {
  align: "right",
  width: 30,
};

StyledLabelContainer.propTypes = {
  align: PropTypes.oneOf(["left", "right"]),
  inline: PropTypes.bool,
  width: PropTypes.number,
  pr: PropTypes.number,
  pl: PropTypes.number,
};

export default LabelStyle;
