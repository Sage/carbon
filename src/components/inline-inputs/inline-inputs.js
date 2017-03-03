import React from 'react';
import classNames from 'classnames';
import Row from './../row';

class InlineInputs extends React.Component {
  static propTypes = {
    /**
     * Defines the label text for the heading.
     *
     * @property label
     * @type {String}
     */
    label: React.PropTypes.string
  }

    /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-inline-inputs",
      this.props.className
    );
  }

  render() {
    return (
      <div className={ this.classes }>
        <label className="carbon-inline-inputs-label">{ this.props.label }</label>
        <Row gutter="none" className="carbon-inline-inputs-wrapper">
          { this.props.children }
        </Row>
      </div>
    );
  }
}

export default InlineInputs;
