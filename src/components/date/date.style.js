import styled from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";

import baseTheme from "../../style/themes/base";
import StyledInputPresentation from "../../__experimental__/components/input/input-presentation.style";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";

const datePickerWidth = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

const StyledDateInput = styled.div`
  ${margin}

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ size }) => (size ? datePickerWidth[size] : "135px")};
  }
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
};

StyledDateInput.defaultProps = {
  theme: baseTheme,
};

export default StyledDateInput;
