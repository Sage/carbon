import styled, { css } from "styled-components";
import { grid, flexbox } from "styled-system";
import styledSystemPropTypes from "@styled-system/prop-types";
import { padding } from "@styled-system/space";
import PropTypes from "prop-types";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

function responsiveGridItem(responsiveSettings) {
  return responsiveSettings.map((setting) => {
    const {
      alignSelf,
      gridColumn,
      gridRow,
      maxWidth,
      justifySelf,
      p,
      pl,
      pr,
      pt,
      pb,
    } = setting;
    return css`
      @media screen and (max-width: ${maxWidth}) {
        align-self: ${alignSelf || "stretch"};
        justify-self: ${justifySelf || "stretch"};
        grid-column: ${gridColumn};
        grid-row: ${gridRow};
        padding: ${getSpacing(p)};
        padding-left: ${getSpacing(pl)};
        padding-right: ${getSpacing(pr)};
        padding-top: ${getSpacing(pt)};
        padding-bottom: ${getSpacing(pb)};
      }
    `;
  });
}

export function getSpacing(prop) {
  if (typeof prop === "number") {
    switch (prop) {
      case 0:
        return "var(--spacing000)";
      case 1:
        return "var(--spacing100)";
      case 2:
        return "var(--spacing200)";
      case 3:
        return "var(--spacing300)";
      case 4:
        return "var(--spacing400)";
      case 5:
        return "var(--spacing500)";
      case 6:
        return "var(--spacing600)";
      case 7:
        return "var(--spacing700)";
      case 8:
        return "var(--spacing800)";
      case 9:
        return "var(--spacing900)";
      case 10:
        return "var(--spacing1000)";
      default:
        return "var(--spacing100)";
    }
  }

  return prop;
}

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const GridItemStyle = styled.div`
  margin: 0;

  ${({ justifySelf }) => flexbox({ justifySelf })}
  ${({ alignSelf }) => flexbox({ alignSelf })}
  ${padding}
  ${({ gridRow }) => grid({ gridRow })}
  ${({ gridColumn }) => grid({ gridColumn })}
  ${({ responsiveSettings }) =>
    responsiveSettings &&
    css`
      ${responsiveGridItem(responsiveSettings)};
    `}
`;

GridItemStyle.propTypes = {
  alignSelf: PropTypes.string,
  gridColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  justifySelf: PropTypes.string,
  ...paddingPropTypes,
  responsiveSettings: PropTypes.arrayOf(
    PropTypes.shape({
      alignSelf: PropTypes.string,
      gridColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      gridRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      justifySelf: PropTypes.string,
      maxWidth: PropTypes.string,
      ...paddingPropTypes,
    })
  ),
};

GridItemStyle.defaultProps = {
  gridColumn: "1 / 13",
  gridRow: "auto",
};

export default GridItemStyle;
