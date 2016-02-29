import React from 'react';
import TextboxDemo from './textbox-demo';
import DecimalDemo from './decimal-demo';
import DropdownDemo from './dropdown-demo';
import RowDemo from './row-demo';

class Forms extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="ui-forms">
        <TextboxDemo />
        <DecimalDemo />
        <DropdownDemo />
        <RowDemo />
      </div>
    );
  }
}

export default Forms;
