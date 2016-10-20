import React from 'react';
import ComponentCodeBuilder from './../../utils/component-code-builder';
import Code from './../../components/code';

class Homepage extends React.Component {
  get code() {
    let span = new ComponentCodeBuilder("span");
    span.addChild('jdfkdsfkd');
    span.addChild('foo');
    let div = new ComponentCodeBuilder("div");
    div.addChild(span);
    div.addChild('ahh');

    let code = new ComponentCodeBuilder("Textbox");
    code.addChild(div)
    code.addChild('umm');
    return code.toString();
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        <Code value={ this.code } />
      </div>
    );
  }
}

export default Homepage;
