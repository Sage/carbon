import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const StyledButtonToogle = styled.button`
  height: 40px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}; /* ToDo */
    background-color: #e6f6f1;
    border-color: ${({ theme }) => theme.text.color};
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({ buttonIconSize }) => buttonIconSize === 'large' && css`
    min-width: 104px;
    height: 104px;
    padding: 0 16px;

    .content-wrapper {
      flex-direction: column;
    }
  `}
`;

const StyledButtonToggleIcon = styled.div`
  ${({ buttonIconSize }) => buttonIconSize === 'large' && css`
    .carbon-icon::before {
      font-size: 40px;
      line-height: 40px;
    }
    .carbon-icon {
      margin-bottom: 8px;
    }
  `}

  ${({ theme }) => theme.name === THEMES.classic && css`
    .carbon-icon::before {
      font-size: 60px;
      line-height: 60px;
    }
  `};
`;

StyledButtonToogle.propTypes = {
  buttonSize: PropTypes.string
};

StyledButtonToggleIcon.propTypes = {
  buttonIconSize: PropTypes.string
};

export {
  StyledButtonToogle,
  StyledButtonToggleIcon
};
