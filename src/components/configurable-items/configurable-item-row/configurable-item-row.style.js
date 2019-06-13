import styled, { css } from 'styled-components';
import Icon from '../../icon/icon';

const ConfigurableItemRowIcon = styled(Icon)`
  cursor: move;
`;

const ConfigurableItemRowContentWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: left;
`;

const ConfigurableItemRowStyle = styled.li`
  /* border-bottom: 1px solid $border-color; CLASSIC-STYLE */
  border-bottom: 1px solid #CCD6DA;
  font-weight: bold;
  padding: 0.5em 0.5em 0.7em;

  ${({ isDragging, isDragged }) => (isDragging || isDragged)
    && css`
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    `}

  ${({ isDragged }) => isDragged
    && css`
      ${ConfigurableItemRowContentWrapper} {
        visibility: hidden;
      }
    `}
`;


export { ConfigurableItemRowStyle, ConfigurableItemRowContentWrapper, ConfigurableItemRowIcon };
