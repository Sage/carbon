import styled from 'styled-components';
import {
  ConfigurableItemRowContentWrapper,
  ConfigurableItemRowIcon,
  ConfigurableItemRowStyle
} from './configurable-item-row/configurable-item-row.style';

const ConfigurableItemsWrapper = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ConfigurableItemsStyle = styled.div`
  .custom-drag-layer {
    ${ConfigurableItemRowStyle} {
      // classic color background
      background-color: #E6EBED;
      border: none;
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;

      ${ConfigurableItemRowIcon} {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }

      ${ConfigurableItemRowContentWrapper} {
        visibility: visible;
      }
    }
  }
`;

export { ConfigurableItemsWrapper, ConfigurableItemsStyle };
