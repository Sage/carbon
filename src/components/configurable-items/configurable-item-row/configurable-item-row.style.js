import styled, { css } from "styled-components";
import Icon from "../../icon";
import baseTheme from "../../../style/themes/base";
import { StyledLabelContainer } from "../../../__experimental__/components/label/label.style";

const ConfigurableItemRowIconStyle = styled(Icon)`
  cursor: grab;

  /* Provides backup cursor view for IE11 */
  @media all and (-ms-high-contrast: none) {
    cursor: move;
  }

  padding-right: 12px;
`;

const ConfigurableItemRowContentWrapperStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: left;
`;

const ConfigurableItemRowStyle = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.disabled.input};
  font-weight: bold;
  padding: 5px 0.5em 5px 0px;

  ${StyledLabelContainer} {
    margin: 0px 6px 6px 6px;
  }

  ${({ isDragging, isDragged }) =>
    (isDragging || isDragged) &&
    css`
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    `}

  ${({ isDragged }) =>
    isDragged &&
    css`
      ${ConfigurableItemRowContentWrapperStyle} {
        visibility: hidden;
      }
    `}
`;

ConfigurableItemRowStyle.defaultProps = {
  theme: baseTheme,
};

ConfigurableItemRowIconStyle.defaultProps = {
  theme: baseTheme,
};

export {
  ConfigurableItemRowStyle,
  ConfigurableItemRowContentWrapperStyle,
  ConfigurableItemRowIconStyle,
};
