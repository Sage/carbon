import React from 'react';
import InputClass from './../../utils/input-class';
import style from './style';

class Textbox extends InputClass {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className='ui-textbox' style={ style.base }>
        { this.labelHTML() }

        <input
          ref="visible"
          style={ style.input }
          { ...this.inputProps() }
        />
      </div>
    );
  }
};

export default Textbox;
