import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { space } from 'styled-system';
import baseTheme from '../../style/themes/base';
import StyledIcon from '../icon/icon.style';

const paddingSizes = {
  XS: '8px',
  S: '16px',
  M: '24px',
  L: '32px',
  XL: '40px'
};

const isHorizontal = orientation => orientation === 'horizontal';
const isVertical = orientation => orientation === 'vertical';

const TileContent = styled.div`
  ${({ width }) => css`
    position: relative;
    flex-grow: 1;

    ${(width && width !== 0) ? `
      flex-grow: 0;
      width: ${width}%;
    ` : ''}
  `}
`;

const StyledTile = styled.div`
  ${({
    orientation, padding, pixelWidth, tileTheme, theme, width
  }) => css`
  
    background-color: ${tileTheme === 'tile' ? theme.colors.white : 'transparent'};
    border: 1px solid ${theme.tile.border};
    display: flex;
    flex-direction: ${isHorizontal(orientation) ? 'row' : 'column'};
    padding: ${paddingSizes[padding]};
    position: relative;
    width: 100%;

    ${(width && width !== 0) ? `width: ${width}%;` : ''}
    ${(pixelWidth && pixelWidth !== 0) ? `width: ${pixelWidth}px;` : ''}

    ${TileContent} {
      box-sizing: border-box;

      ${isHorizontal(orientation) && 'display: inline;'}

      ${isVertical(orientation) && 'width: auto;'}

      &:not(:last-of-type) {
        padding-${isHorizontal(orientation) ? 'right' : 'bottom'}: ${paddingSizes[padding]};
      }

      & + ${TileContent} {
        margin-top: 0;

        ${isHorizontal(orientation) && css`
          border-left: solid 1px ${theme.tile.separator};
          padding-left: ${paddingSizes[padding]};
        `}

        ${isVertical(orientation) && css`
          border-top: solid 1px ${theme.tile.separator};
          padding-top: ${paddingSizes[padding]};
        `}
      }
    }
  `}
`;

const StyledHeadingWrapper = styled.div`
  ${({ theme, isExpanded }) => css`
    display:flex 
    justify-content: space-between;
    align-items: center;

    :focus{
      outline:2px solid ${theme.colors.focus};
    }

    :hover{
      background: ${theme.tileHeader.hoverBackground};
      cursor: pointer;
    }
  
    ${StyledIcon}{
      transition: all 0.3s;
      
     ${!isExpanded && 'transform: rotate(90deg)'};
    }

    ${space};
  `}
`;

const StyledCollapsableContent = styled.div`
  ${({ isExpanded, maxHeight }) => css`
    overflow: hidden;
    transition: all 0.3s;
    
    ${space};

    ${isExpanded && space};

    ${!isExpanded && css`
      visibility: 'hidden';
      opacity: '0';
      height: ${maxHeight};
      padding-top: 0;
      padding-bottom: 0;
    `}
  `}
`;


TileContent.propTypes = {
  width: PropTypes.number
};

StyledTile.propTypes = {
  orientation: PropTypes.string,
  padding: PropTypes.string,
  tileTheme: PropTypes.string,
  width: PropTypes.number
};

StyledTile.defaultProps = {
  theme: baseTheme
};

export {
  StyledTile, TileContent, StyledCollapsableContent, StyledHeadingWrapper
};
