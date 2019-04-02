import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import Icon from '../icon';
import './detail.scss';

class Detail extends React.Component {
  static propTypes = {
    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * The type of icon to use.
     */
    icon: PropTypes.string,

    /**
     * A small detail to display under the main content.
     */
    footnote: PropTypes.string,

    /**
     * The rendered children of the component.
     */
    children: PropTypes.node
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      'carbon-detail',
      this.props.className, {
        'carbon-detail--has-icon': this.props.icon
      }
    );
  }

  /**
   * Returns the markup for the icon if one if specified.
   *
   * @method icon
   * @return {Object} JSX
   */
  icon = () => {
    if (!this.props.icon) { return null; }

    return (
      <Icon
        className='carbon-detail__icon' type={ this.props.icon }
        data-element='icon'
      />
    );
  }

  /**
   * Returns the markup for the footnote if one if specified.
   *
   * @method footnote
   * @return {Object} JSX
   */
  footnote = () => {
    if (!this.props.footnote) { return null; }

    return (
      <div className='carbon-detail__footnote' data-element='footnote'>
        { this.props.footnote }
      </div>
    );
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.classes } { ...tagComponent('detail', this.props) }>
        { this.icon() }

        <div className='carbon-detail__content'>
          { this.props.children }
        </div>

        { this.footnote() }
      </div>
    );
  }
}

export default Detail;
