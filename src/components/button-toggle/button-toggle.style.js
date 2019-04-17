import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const StyledButtonToogle = styled.div`
  display: inline;
`;

const StyledButtonToogleLabel = styled.label`
  display: inline-block;
  height: 40px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  font-weight: 600;

  input:checked ~ & {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteMix};
    border-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
  StyledButtonToogleLabel,
  StyledButtonToggleIcon
};
