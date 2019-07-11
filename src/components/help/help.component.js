import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import StyledHelp from './help.style';

const Help = (props) => {
  const {
    className,
    href,
    children,
    tooltipPosition,
    tooltipAlign
  } = props;
  let tagType;

  if (href) {
    tagType = 'a';
  }

  return (
    <StyledHelp
      className={ className }
      as={ tagType }
      href={ href }
      target='_blank'
      rel='noopener noreferrer'
      { ...tagComponent('help', props) }
    >
      <Icon
        type='help'
        tooltipMessage={ children }
        tooltipPosition={ tooltipPosition }
        tooltipAlign={ tooltipAlign }
      />
    </StyledHelp>
  );
};

Help.propTypes = {
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** Message to display in tooltip */
  children: PropTypes.string,
  /** Position of tooltip relative to target */
  tooltipPosition: PropTypes.string,
  /** Aligment of pointer */
  tooltipAlign: PropTypes.string,
  /** A path for the anchor */
  href: PropTypes.string
};

Help.defaultProps = {
  tooltipPosition: 'top',
  tooltipAlign: 'center'
};

export default Help;
