import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledCharacterCount from "./character-count.style";

const CharacterCount = ({ value, limit, theme, ...props }) => (
  <StyledCharacterCount theme={theme} aria-live="polite" {...props}>
    {`${value}/${limit}`}
  </StyledCharacterCount>
);

CharacterCount.propTypes = {
  value: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  theme: PropTypes.object,
};

CharacterCount.defaultProps = {
  theme: baseTheme,
};

export default withTheme(CharacterCount);
export { CharacterCount };
