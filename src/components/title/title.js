import classNames from 'classnames';
import React from 'react';

/**
 * A Title widget.
 *
 * == How to use a Title in a component:
 *
 * In your file
 *
 *   import Title from 'carbon/lib/components/title';
 *
 * To render the Title:
 *
 *   <Title
 *     start='First bit of the title'
 *     end='and the last bit of the title'
 *     highlight='start'
 *   />
 *
 * @class Title
 * @constructor
 */
class Title extends React.Component {
  static propTypes = {
    /**
     * first part of the title
     *
     * @property start
     * @type {string}
     */
    start: React.PropTypes.string,

    /**
     * second part of the title
     *
     * @property end
     * @type {string}
     */
    end: React.PropTypes.string,

    /**
     * decides which part of the title to highlight, either 'start' or 'end'
     *
     * @property highlight
     * @type {string}
     */
    highlight: React.PropTypes.string
  }

  static defaultProps = {
    highlight: 'start'
  }

  classes() {
    return classNames(
      `carbon-title--${this.props.highlight}-highlighted`,
      'carbon-title'
    );
  }

  render() {
    return (
      <span className={ this.classes() }>
        <span className='carbon-title__start'>{ this.props.start }</span>
        <span className='carbon-title__end'>{ this.props.end }</span>
      </span>
    );
  }
}

export default Title;
