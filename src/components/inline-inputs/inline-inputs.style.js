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

  .carbon-row.carbon-row--gutter-extra-small {
    margin-bottom: 0;
    margin-left: -8px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 8px;
    }
  }

  .carbon-row.carbon-row--gutter-small {
    margin-bottom: 0;
    margin-left: -16px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 16px;
    }
  }

  .carbon-row.carbon-row--gutter-medium-small {
    margin-bottom: 0;
    margin-left: -20px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 20px;
    }
  }

  .carbon-row.carbon-row--gutter-medium {
    margin-bottom: 0;
    margin-left: -24px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 24px;
    }
  }

  .carbon-row.carbon-row--gutter-medium-large {
    margin-bottom: 0;
    margin-left: -28px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 28px;
    }
  }

  .carbon-row.carbon-row--gutter-large {
    margin-bottom: 0;
    margin-left: -32px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 32px;
    }
  }

  .carbon-row.carbon-row--gutter-extra-large {
    margin-bottom: 0;
    margin-left: -40px;

    > .carbon-column {
      margin-bottom: 0;
      padding-left: 40px;
    }
  }
`;

StyledInlineInputs.defaultProps = {
  theme: baseTheme
};

export default StyledInlineInputs;
