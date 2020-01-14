import styled, { css } from 'styled-components';
import {
  PagerContainerClassicStyles,
  PagerNavigationClassicStyles
} from './pager-classic.styles';
import StyledInput from '../../__experimental__/components/input/input.style';
import StyledInputPresentation from '../../__experimental__/components/input/input-presentation.style';
import mintTheme from '../../style/themes/mint';

const PagerContainerStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 24px;
  align-items: center;
  border-top-width: 0;
  font-size: 13px;  
  ${({ theme }) => {
    return theme.table && theme.colors && css`
      border: 1px solid ${theme.table.selected};
      background-color: ${theme.table.zebra};
      
      .common-input__input {
        &:active, :hover {
          border-color: ${theme.table.secondary};
        }
      }
    `;
  }}
  border-top: none;

  ${PagerContainerClassicStyles}
`;

const PagerSizeOptionsStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-start;

  .carbon-dropdown {
    width: 55px;
    margin: 0 4px;
  }
`;

const PagerSizeOptionsInnerStyles = styled.div`
  display: flex;
  align-items: center;
`;

const PagerNavigationStyles = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;

  && ${StyledInputPresentation} {
    padding: 0;
    margin: 0 4px;
    line-height: 24px;
    min-height: 24px;
  }

  && ${StyledInput} {
    text-align: center;
    height: 24px;
  }

  ${PagerNavigationClassicStyles}
`;

const PagerNavInnerStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const PagerButtonWrapperStyles = styled.div`
  display: inline-block;
  transform: rotate(90deg) scale(1.4);
  cursor: pointer;
  margin-right: 8px;

  ${({ disabled }) => disabled && css`
    opacity: 0.3;
    cursor: not-allowed;
  `};

  ${({ next }) => next && css`
    transform: rotate(-90deg) scale(1.4);
    margin-right: 0;
    margin-left: 8px;
  `};
`;

const PagerLinkStyles = styled.button`
  padding: 0 4px;
  font-size: 13px;
  border-width: 0;
  text-decoration: underline;
  background-color: transparent;
  cursor: pointer;

  ${({ theme }) => theme.pager && css`
    color: ${theme.pager.active};

    ${({ disabled }) => !disabled && css`
      &:hover {
        color: ${theme.pager.hover};
      }

      &:focus {
        outline: none;
        background-color: ${theme.colors.focusedLinkBackground};
        color: ${theme.pager.hover};
      }
    `}
  `}
 
  ${({ disabled, theme }) => disabled && css`
    color: ${theme.pager.disabled};
    cursor: not-allowed;
  `}
`;

const PagerNoSelectStyles = styled.span`
  user-select: none;
`;

const PagerSummaryStyles = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-end;
`;

PagerContainerStyles.defaultProps = {
  theme: mintTheme
};

PagerSizeOptionsStyles.defaultProps = {
  theme: mintTheme
};

PagerSizeOptionsInnerStyles.defaultProps = {
  theme: mintTheme
};

PagerNavigationStyles.defaultProps = {
  theme: mintTheme
};

PagerNavInnerStyles.defaultProps = {
  theme: mintTheme
};

PagerLinkStyles.defaultProps = {
  theme: mintTheme
};

PagerButtonWrapperStyles.defaultProps = {
  theme: mintTheme
};

PagerSummaryStyles.defaultProps = {
  theme: mintTheme
};

export {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerSizeOptionsInnerStyles,
  PagerNavigationStyles,
  PagerNavInnerStyles,
  PagerLinkStyles,
  PagerButtonWrapperStyles,
  PagerNoSelectStyles,
  PagerSummaryStyles
};
