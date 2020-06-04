import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

function responsiveGridItem(responsiveSettings) {
  return responsiveSettings.map((setting) => {
    const {
      colStart,
      colEnd,
      maxWidth,
      rowStart,
      rowEnd,
      alignSelf,
      justifySelf
    } = setting;

    return css`
      @media screen and (max-width: ${maxWidth}) {
        align-self: ${alignSelf || 'stretch'};
        justify-self: ${justifySelf || 'stretch'};
        grid-column-start: ${colStart};
        grid-column-end: ${colEnd};
        grid-row-start: ${rowStart};
        grid-row-end: ${rowEnd};
      }
    `;
  });
}

const GridItemStyle = styled.div`
  margin: 0;

  ${({
    gridColumnStart,
    gridColumnEnd,
    gridRowStart,
    gridRowEnd,
    alignSelf,
    justifySelf
  }) => css`
    grid-column-start: ${gridColumnStart};
    grid-column-end: ${gridColumnEnd};
    grid-row-start: ${gridRowStart};
    grid-row-end: ${gridRowEnd};
    align-self: ${alignSelf};
    justify-self: ${justifySelf};
  `}

  ${({ responsiveSettings }) => responsiveSettings && css`
    ${responsiveGridItem(responsiveSettings)};
  `}
`;

GridItemStyle.propTypes = {
  gridColumnStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridColumnEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridRowStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridRowEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alignSelf: PropTypes.string,
  justifySelf: PropTypes.string,
  responsiveSettings: PropTypes.arrayOf(
    PropTypes.shape({
      alignSelf: PropTypes.string,
      colStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      colEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      justifySelf: PropTypes.string,
      maxWidth: PropTypes.string,
      rowStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rowEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

export default GridItemStyle;
