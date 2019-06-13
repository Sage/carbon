import styled, { css } from 'styled-components';
import Icon from '../../icon/icon';
import { THEMES } from '../../../style/themes';
import baseTheme from '../../../style/themes/base';

const ConfigurableItemRowIconStyle = styled(Icon)`
  cursor: move;
`;

const ConfigurableItemRowContentWrapperStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: left;
`;

const ConfigurableItemRowStyle = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.disabled.input};
  font-weight: bold;
  padding: 0.5em 0.5em 0.7em;

  ${({ theme }) => theme.name === THEMES.classic && css`
    border-bottom: 1px solid #CCD6DA;
  `}

  ${({ isDragging, isDragged }) => (isDragging || isDragged)
    && css`
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    `}

  ${({ isDragged }) => isDragged
    && css`
      ${ConfigurableItemRowContentWrapperStyle} {
        visibility: hidden;
      }
    `}
`;

ConfigurableItemRowStyle.defaultProps = {
  theme: baseTheme
};

export { ConfigurableItemRowStyle, ConfigurableItemRowContentWrapperStyle, ConfigurableItemRowIconStyle };
