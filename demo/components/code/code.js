import React from 'react';
import Highlight from 'react-highlight';
import './code.scss';

class Code extends React.Component {
  render() {
    return (
      <code className="demo-code">
        <Highlight className="javascript">
          { "return\n" + this.props.children }
        </Highlight>
      </code>
    );
  }
}

export default Code;
