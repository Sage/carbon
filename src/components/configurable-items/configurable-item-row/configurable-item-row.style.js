import styled, { css } from 'styled-components';
import Icon from '../../icon';
import baseTheme from '../../../style/themes/base';
import LabelStyle from '../../../__experimental__/components/label/label.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const ConfigurableItemRowIconStyle = styled(Icon)`
  cursor: move;
  padding-right: 12px;

  ${({ theme }) => isClassic(theme) && css`
      padding-right: 0;
  `}
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

  ${LabelStyle}{
    padding: 0px 6px 6px 6px;
  }

  ${({ theme }) => isClassic(theme) && css`
    border-bottom: 1px solid #CCD6DA;
    padding: 0.5em 0.5em 0.7em;
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

ConfigurableItemRowIconStyle.defaultProps = {
  theme: baseTheme
};

export { ConfigurableItemRowStyle, ConfigurableItemRowContentWrapperStyle, ConfigurableItemRowIconStyle };
