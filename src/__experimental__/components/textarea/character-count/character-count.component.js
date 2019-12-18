import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import baseTheme from '../../../../style/themes/base';
import StyledCharacterCount from './character-count.style';
import ClassicCharacterCount from './classic-character-count.component';
import { isClassic } from '../../../../utils/helpers/style-helper';

const CharacterCount = ({
  value, limit, theme, ...props
}) => {
  if (isClassic(theme)) {
    return (
      <ClassicCharacterCount
        value={ value }
        limit={ limit }
        theme={ theme }
        { ...props }
      />
    );
  }

  return (
    <StyledCharacterCount theme={ theme } { ...props }>
      {value}/{limit}
    </StyledCharacterCount>
  );
};

CharacterCount.propTypes = {
  value: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  theme: PropTypes.object
};

CharacterCount.defaultProps = {
  theme: baseTheme
};

export default withTheme(CharacterCount);
export { CharacterCount };
