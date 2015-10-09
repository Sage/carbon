import React from 'react';
import InputClass from './../../utils/InputClass';
import Immutable from 'immutable';

class Textbox extends InputClass {

  /**
   * Renders the component.
   *
   * @method render
   */
  render = () => {
    return (
      <div className="ui-textbox">
        { this.labelHTML() }
        <input
          { ...this.inputProps() }
        />
      </div>
    );
  }

};

export default Textbox;
