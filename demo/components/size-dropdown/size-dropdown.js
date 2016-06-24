import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class SizeDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: "xsmall",
      name: "XSmall"
    }, {
      id: "small",
      name: "Small"
    }, {
      id: "smed",
      name: "Smed"
    }, {
      id: "med",
      name: "Med"
    }, {
      id: "lmed",
      name: "Lmed"
    }, {
      id: "large",
      name: "Large"
    }, {
      id: "xlarge",
      name: "XLarge"
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
