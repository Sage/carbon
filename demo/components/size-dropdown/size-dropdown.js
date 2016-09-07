import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class SizeDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: "extra-small",
      name: "Extra Small"
    }, {
      id: "small",
      name: "Small"
    }, {
      id: "medium-small",
      name: "Medium Small"
    }, {
      id: "medium",
      name: "Medium"
    }, {
      id: "medium-large",
      name: "Medium Large"
    }, {
      id: "large",
      name: "Large"
    }, {
      id: "extra-large",
      name: "Extra Large"
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
