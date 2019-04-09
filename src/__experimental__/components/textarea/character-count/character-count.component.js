import React from 'react';
import PropTypes from 'prop-types';
import StyledCharacterCount from './character-count.style';

const CharacterCount = ({ value, limit }) => {
  return (
    <StyledCharacterCount>
      {value}/{limit}
    </StyledCharacterCount>
  );
};

CharacterCount.propTypes = {
  value: PropTypes.number.isRequired,
  limit: PropTypes.string.isRequired
};

export default CharacterCount;
