import React from 'react';
import InputClass from './../../utils/input-class/index.js';

class Textbox extends InputClass {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className='ui-textbox'>
        { this.labelHTML() }

        <input
          ref="visible"
          className="visible-textbox-input input"
          { ...this.inputProps() }
        />
      </div>
    );
  }
};

export default Textbox;
