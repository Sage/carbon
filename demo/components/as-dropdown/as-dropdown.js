import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class AsDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: null,
      name: "Please Select"
    }, {
      id: "default",
      name: "Default"
    }, {
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

    if (this.props.extraOpts) { opts = opts.concat(this.props.extraOpts); }

    let { ...props } = this.props;

    delete props.extraOpts

    return (
      <Dropdown
        placeholder="Please Select"
        options={ opts }
        label="As"
        labelInline={ true }
        { ...props }
      />
    );
  }
}

export default AsDropdown;
