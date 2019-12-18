import styled, { css } from 'styled-components';
import LabelStyle from '../../__experimental__/components/label/label.style';
import baseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledInlineInputs = styled.div`
  display: flex;
  align-items: center;

  ${LabelStyle} {
    font-weight: bold;
    margin-right: 15px;
    width: auto;
  }

  input {
    width: 100%;
  }

  [data-component="carbon-select"] input {
    width: 30px;
  }

  .carbon-row {
    flex-grow: 1;
  }

  .carbon-column + .carbon-column {
    margin-left: -1px;
  }

  ${({ theme }) => isClassic(theme) && css`
    ${LabelStyle} {
      padding-right: 0;
    }

    .carbon-row {
      flex-grow: 0;
    }
  `}
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme
};

export default StyledInlineInputs;
