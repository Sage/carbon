import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space, layout, flexbox } from "styled-system";
import BaseTheme from "../../style/themes/base";
import color from "../../style/utils/color";

const Box = styled.div`
  ${space}
  ${layout}
  ${flexbox}
  ${color}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: ${overflowWrap};
    `}

  ${({ scrollVariant, theme }) =>
    scrollVariant &&
    css`
      scrollbar-color: ${theme.scrollbar[scrollVariant].thumb}
        ${theme.scrollbar[scrollVariant].track};

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${theme.scrollbar[scrollVariant].track};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${theme.scrollbar[scrollVariant].thumb};
      }
    `}
`;

Box.propTypes = {
  /** Styled system box props */
  ...propTypes.space,
  /** Styled system flex props */
  ...propTypes.flexbox,
  /** Styled system layout props */
  ...propTypes.layout,
  /** Styled system color props */
  ...propTypes.color,
  /** String to set Box content break strategy. Note "anywhere" is not supported in Safari and IE11 */
  overflowWrap: PropTypes.oneOf(["break-word", "anywhere"]),
  /** scroll styling attribute */
  scrollVariant: PropTypes.oneOf(["light", "dark"]),
};

Box.defaultProps = {
  theme: BaseTheme,
};

export default Box;
