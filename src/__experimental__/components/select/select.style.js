import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledSelectPillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3px 2px 3px 0;

  .carbon-pill {
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${({ theme }) => !isClassic(theme) && css`
      .carbon-icon {
        height: 0px;
      }
    `}
  }
`;

StyledSelectPillContainer.propTypes = {
  theme: PropTypes.object
};

StyledSelectPillContainer.defaultProps = {
  theme: baseTheme
};

export default StyledSelectPillContainer;
