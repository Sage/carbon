import styled from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";

import baseTheme from "../../style/themes/base";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";

const datePickerWidth = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

const StyledDateInput = styled.div`
  ${margin}

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ size }) => datePickerWidth[size]};
  }
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

StyledDateInput.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

export default StyledDateInput;
