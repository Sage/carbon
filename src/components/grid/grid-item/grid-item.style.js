import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

function responsiveGridItem({
  responsiveSettings,
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd
}) {
  const item = responsiveSettings.map((setting) => {
    const {
      alignSelf,
      colStart,
      colEnd,
      justifySelf,
      maxWidth,
      rowStart,
      rowEnd
    } = setting;

    return css`
      margin: 0;
      grid-column-start: ${gridColumnStart};
      grid-column-end: ${gridColumnEnd};
      grid-row-start: ${gridRowStart};
      grid-row-end: ${gridRowEnd};

      @media screen and (max-width: ${maxWidth}) {
        align-self: ${alignSelf || 'stretch'};
        justify-self: ${justifySelf || 'stretch'};
        grid-column-start: ${colStart};
        grid-column-end: ${colEnd};
        grid-row-start: ${rowStart};
        grid-row-end: ${rowEnd};
      }`;
  });
  return item;
}

const GridItemStyle = styled.div`
  ${responsiveGridItem}
`;

GridItemStyle.propTypes = {
  gridColumnStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridColumnEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridRowStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridRowEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
