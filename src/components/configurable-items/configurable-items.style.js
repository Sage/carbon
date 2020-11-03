import styled from "styled-components";
import Button from "../button";
import {
  ConfigurableItemRowContentWrapperStyle,
  ConfigurableItemRowIconStyle,
  ConfigurableItemRowStyle,
} from "./configurable-item-row/configurable-item-row.style";
import StyledFormField from "../../__experimental__/components/form-field/form-field.style";
import StyledCheckbox from "../../__experimental__/components/checkbox/checkbox.style";

import baseTheme from "../../style/themes/base";

const ConfigurableItemsButtonReset = styled(Button)`
  &&& {
    padding-left: 0px;
    padding-right: 0px;
    margin-right: auto;
  }
`;

const ConfigurableItemsWrapper = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  && ${StyledCheckbox} {
    margin-top: 8px;
  }

  && ${StyledFormField} {
    margin-bottom: 0px;
  }
`;

const ConfigurableItemsStyle = styled.div`
  .custom-drag-layer {
    ${ConfigurableItemRowStyle} {
      background-color: ${({ theme }) => theme.disabled.button};
      border: none;
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;

      ${ConfigurableItemRowIconStyle} {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }

      ${ConfigurableItemRowContentWrapperStyle} {
        visibility: visible;
      }
    }
  }
`;

ConfigurableItemsStyle.defaultProps = {
  theme: baseTheme,
};

export {
  ConfigurableItemsWrapper,
  ConfigurableItemsStyle,
  ConfigurableItemsButtonReset,
};
