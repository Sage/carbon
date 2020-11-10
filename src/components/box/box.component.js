import propTypes from "@styled-system/prop-types";
import styled from "styled-components";
import { space, layout, flexbox } from "styled-system";
import BaseTheme from "../../style/themes/base";
import color from "../../style/utils/color";

const Box = styled.div`
  ${space}
  ${layout}
  ${flexbox}
  ${color}
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
};

Box.defaultProps = {
  theme: BaseTheme,
};

export default Box;
