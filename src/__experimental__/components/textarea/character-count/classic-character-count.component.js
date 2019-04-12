import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import StyledClassicCharacterCount from './classic-character-count.style';

const ClassicCharacterCount = ({
  value, limit, ...props
}) => (
  <StyledClassicCharacterCount { ...props }>
    { I18n.t('textarea.limit.prefix', { defaultValue: 'You have used ' }) }
    <span>
      { value }
    </span>
    { I18n.t('textarea.limit.middle', { defaultValue: ' of ' }) }
    <span>
      { limit }
    </span>
    { I18n.t('textarea.limit.suffix', { defaultValue: ' characters' }) }
  </StyledClassicCharacterCount>
);

ClassicCharacterCount.propTypes = {
  value: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired
};

export default ClassicCharacterCount;
