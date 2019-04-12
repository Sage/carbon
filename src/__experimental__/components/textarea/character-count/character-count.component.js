import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { THEMES } from '../../../../style/themes';
import StyledCharacterCount from './character-count.style';
import ClassicCharacterCount from './classic-character-count.component';

const CharacterCount = ({
  value, limit, theme, ...props
}) => {
  if (theme.name === THEMES.classic) {
    return (
      <ClassicCharacterCount
        value={ value }
        limit={ limit }
        { ...props }
      />
    );
  }

  return (
    <StyledCharacterCount { ...props }>
      {value}/{limit}
    </StyledCharacterCount>
  );
};

CharacterCount.propTypes = {
  value: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  theme: PropTypes.object
};

export default withTheme(CharacterCount);
export { CharacterCount };
