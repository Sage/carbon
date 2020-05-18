import styled, { css } from 'styled-components';
import Fieldset from '../../__experimental__/components/fieldset';
import { Input } from '../../__experimental__/components/input';
import Button from '../button';

import { LegendContainerStyle } from '../../__experimental__/components/fieldset/fieldset.style';
import { baseTheme } from '../../style/themes';

const StyledRadioTile = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.radioTile.border};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 24px;

  ${({ checked, theme }) => checked && css`
    border-color: ${theme.radioTile.checkedBorder};
    background: ${theme.radioTile.selectedBackground};
    z-index: 10;
  `}

  ${({ disabled }) => disabled && 'opacity: 0.5'};
`;

const StyledRadioTileContainer = styled.div`
  width: 100%;
  position: relative;

  & + & ${StyledRadioTile} {
    margin-top: -1px;
  }

  &:hover ${StyledRadioTile} {
    background: ${({ theme }) => theme.radioTile.hoverBackground};
  }
`;


const StyledRadioTileInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  z-index: 100;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:focus + ${StyledRadioTile}  {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    z-index: 15;
  }
`;

const StyledTitleContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  margin-bottom: 8px;
  position: relative;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  margin-right: 16px;
`;

const StyledSubtitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  margin-right: 8px;
`;

const StyledAdornment = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 500;
`;

const StyledDescription = styled.p`
  color: ${({ theme }) => theme.radioTile.descriptionColor};
  font-size: 14px;
  margin: 0;
`;

const StyledDeselectButton = styled(Button)`
  position: absolute;
  top: 14px;
  right: 4px;
  z-index: 200
`;

const StyledRadioTileFieldset = styled(Fieldset)`
  ${LegendContainerStyle} {
    margin-bottom: 16px;

    legend {
      font-size: 16px;
      line-height: 16px;
      margin-left: -2px;
    } 
  }

  ${({ multiSelect }) => multiSelect && css`
    ${StyledRadioTileContainer} {
      margin-bottom: 16px;
    }
  `}
`;

const StyledGroupDescription = styled.p`
  color: ${({ theme }) => theme.radioTile.descriptionColor};
  margin: 0;
  margin-bottom: 16px;
`;


StyledRadioTile.defaultProps = {
  theme: baseTheme
};
StyledRadioTileContainer.defaultProps = {
  theme: baseTheme
};
StyledGroupDescription.defaultProps = {
  theme: baseTheme
};
StyledRadioTileInput.defaultProps = {
  theme: baseTheme
};
StyledDescription.defaultProps = {
  theme: baseTheme
};

export {
  StyledRadioTileFieldset,
  StyledGroupDescription,
  StyledRadioTileContainer,
  StyledRadioTile,
  StyledRadioTileInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectButton
};
