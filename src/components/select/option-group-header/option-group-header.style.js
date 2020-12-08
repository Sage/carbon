import styled from "styled-components";
import propTypes from "prop-types";
import StyledIcon from "../../icon/icon.style";
import baseTheme from "../../../style/themes/base";

const StyledOptionGroupHeader = styled.div`
  box-sizing: border-box;
  height: 26px;
  margin: 16px 0 0;
  padding-left: 16px;
  display: flex;
  align-items: center;
  width: 100%;

  h4 {
    font-size: 12px;
    text-transform: uppercase;
    line-height: 18px;
    text-align: left;
    margin: 0;
    color: ${({ theme }) => theme.select.optionHeader};
  }

  ${StyledIcon} {
    margin-right: 4px;
    margin-left: -5px;
    color: ${({ theme }) => theme.select.optionHeader};

    &:hover {
      color: ${({ theme }) => theme.select.optionHeader};
    }
  }
`;

StyledOptionGroupHeader.propTypes = {
  theme: propTypes.object,
};

StyledOptionGroupHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledOptionGroupHeader;
