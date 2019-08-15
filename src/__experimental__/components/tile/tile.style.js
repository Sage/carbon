import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const paddingSizes = {
  'extra-small': '8px',
  small: '12px',
  medium: '16px',
  large: '32px',
  'extra-large': '40px'
};

const isHorizontal = orientation => orientation === 'horizontal';
const isVertical = orientation => orientation === 'vertical';

const TileContent = styled.div`
  ${({ width }) => css`
    position: relative;
    flex-grow: 1;

    ${width && width !== 0 && `
      flex-grow: 0;
      width: ${width}%;
    `}
  `}
`;

const StyledTile = styled.div`
  ${({
    orientation, padding, tileTheme, theme, width
  }) => css`
    background-color: ${tileTheme === 'tile' ? theme.colors.white : 'transparent'};
    border: 1px solid ${theme.tile.border};
    display: flex;
    flex-direction: ${isHorizontal(orientation) ? 'row' : 'column'};
    padding: ${paddingSizes[padding]};
    position: relative;
    width: ${(width && width !== 0) ? `${width}` : '100'}%;

    ${TileContent} {
      box-sizing: border-box;

      ${isHorizontal(orientation) && 'display: inline;'}

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
          width: auto;
        `}
      }
    }
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

export { StyledTile, TileContent };
