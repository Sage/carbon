import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../../components/icon';
import tagComponent from '../../../utils/helpers/tags';
import StyledHelp from './help.style';

class Help extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
    type: PropTypes.string,
    tooltipPosition: PropTypes.string,
    tooltipAlign: PropTypes.string,
    href: PropTypes.string
  };

  static defaultProps = {
    tooltipPosition: 'top',
    tooltipAlign: 'center',
    type: 'help'
  }

  get mainClasses() {
    return classNames(
      'carbon-help',
      { 'carbon-help__href': this.props.href },
      this.props.className
    );
  }

  render() {
    return (
      <StyledHelp
        className={ this.mainClasses }
        href={ this.props.href }
        target='_blank'
        rel='noopener noreferrer'
        { ...tagComponent('help', this.props) }
      >
        <Icon
          type={ this.props.type }
          tooltipMessage={ this.props.children }
          tooltipPosition={ this.props.tooltipPosition }
          tooltipAlign={ this.props.tooltipAlign }
        />
      </StyledHelp>
    );
  }
}

export default Help;
