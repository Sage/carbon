import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icon';
import tagComponent from '../../../utils/helpers/tags';
import StyledHelp from './help.style';

const Help = (props) => {
  return (
    <StyledHelp
      href={ props.href }
      target='_blank'
      rel='noopener noreferrer'
      { ...tagComponent('help', props) }
    >
      <Icon
        type={ props.type }
        tooltipMessage={ props.children }
        tooltipPosition={ props.tooltipPosition }
        tooltipAlign={ props.tooltipAlign }
      />
    </StyledHelp>
  );
};

Help.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipAlign: PropTypes.string,
  href: PropTypes.string
};

Help.defaultProps = {
  tooltipPosition: 'top',
  tooltipAlign: 'center',
  type: 'help'
};

export default Help;
