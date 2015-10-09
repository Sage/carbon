import React from 'react';
import Radium from 'radium';
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
      <div style={ style.base }>
        { this.labelHTML() }
        <input
          style={ style.input }
          { ...this.inputProps() }
        />
      </div>
    );
  }

};

export default Radium(Textbox);
