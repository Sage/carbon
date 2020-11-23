import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";

export const StyledSettingsRow = styled.div`
  clear: both;
  color: ${({ theme }) => theme.palette.slateTint(20)};
  display: flex;
  font-family: Lato;
  font-size: 14px;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  position: relative;

  ${({ hasDivider }) =>
    hasDivider &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.palette.slateTint(90)};
      padding-bottom: 30px;
    `}

  .carbon-heading__title {
    color: ${({ theme }) => theme.palette.slate};
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .carbon-heading__separator {
    margin: 0 0 17px;
  }

  .carbon-heading--has-subheader .carbon-heading__header {
    padding: 0;
  }

  + .carbon-settings-row {
    padding-top: 30px;
  }
`;

StyledSettingsRow.defaultProps = {
  theme: baseTheme,
};

export const StyledSettingsRowHeader = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  max-width: 325px;
  width: 35%;
`;

export const StyledSettingsRowInput = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  margin-left: 50px;
  width: 100%;
`;
