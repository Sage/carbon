import React from 'react';
import Immutable from 'immutable';
import Dropdown from 'components/dropdown';

class TextDropdown extends React.Component {
  render() {
    let opts = Immutable.fromJS([{
      id: "inactive-standard-small",
      name: "inactive-standard-small"
    }, {
      id: "inactive-italic-medium",
      name: "inactive-italic-medium"
    }, {
      id: "standard-medium",
      name: "standard-medium"
    }, {
      id: "inactive-standard-medium",
      name: "inactive-standard-medium"
    }]);

    if (this.props.extraOpts) {
      opts = opts.concat(this.props.extraOpts);
    }

    return (
      <Dropdown
        options={ opts }
        label="Text Style"
        labelInline={ false }
        { ...this.props }
      />
    );
  }
}

export default TextDropdown;
