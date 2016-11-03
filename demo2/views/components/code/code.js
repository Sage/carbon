import React from 'react';
import Textarea from 'components/textarea';

class Code extends React.Component {
  render() {
    return (
      <Textarea
        className="demo-code"
        value={ this.props.value }
        expandable={ true }
        onChange={ this.props.onChange }
      />
    );
  }
}

export default Code;
