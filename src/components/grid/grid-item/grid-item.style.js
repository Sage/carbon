import styled, { css } from "styled-components";
import { grid, flexbox } from "styled-system";
import styledSystemPropTypes from "@styled-system/prop-types";
import { padding } from "@styled-system/space";
import PropTypes from "prop-types";
import { baseTheme } from "../../../style/themes";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

function responsiveGridItem(responsiveSettings, theme) {
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
        padding: ${getSpacing(p, theme)};
        padding-left: ${getSpacing(pl, theme)};
        padding-right: ${getSpacing(pr, theme)};
        padding-top: ${getSpacing(pt, theme)};
        padding-bottom: ${getSpacing(pb, theme)};
      }
    `;
  });
}

function getSpacing(prop, theme) {
  if (prop && typeof prop === "number") {
    return `${theme.space[prop]}px`;
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
  ${({ responsiveSettings, theme }) =>
    responsiveSettings &&
    css`
      ${responsiveGridItem(responsiveSettings, theme)};
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
  theme: baseTheme,
};

export default GridItemStyle;
