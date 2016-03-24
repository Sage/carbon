import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class SizeDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: "small",
      name: "Small"
    }, {
      id: "smed",
      name: "Smed"
    }, {
      id: "lmed",
      name: "Lmed"
    }, {
      id: "large",
      name: "Large"
    }]);

    return (
      <Dropdown
        options={ opts }
        label="Size"
        labelInline={ true }
        { ...this.props }
      />
    );
  }
}

export default SizeDropdown;
