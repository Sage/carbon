import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class AsDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: "error",
      name: "Error"
    }, {
      id: "help",
      name: "Help"
    }, {
      id: "info",
      name: "Information"
    }, {
      id: "maintenance",
      name: "Maintenance"
    }, {
      id: "new",
      name: "New"
    }, {
      id: "success",
      name: "Success"
    }, {
      id: "warning",
      name: "Warning"
    }]);

    opts = opts.concat(this.props.extraOpts);

    return (
      <Dropdown
        options={ opts }
        label="As"
        labelInline={ true }
        { ...this.props }
      />
    );
  }
}

export default AsDropdown;
