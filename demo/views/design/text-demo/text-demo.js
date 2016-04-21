import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import TextArea from 'components/textarea';
import TextDropdown from './../../../components/text-dropdown';
import Row from 'components/row';

class TextDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['text', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'text');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <p className={ this.value('className')}>
        { this.value('content') }
      </p>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "@import 'text';\n\n";

    html += "<p className=" + (this.value('className')) + ">\n";
    html += "  My Content\n";
    html += "</p>\n\n"

    html += "CSS Applied\n\n"
    switch (this.value('className')) {
      case "standard-medium":
        html += ".standard-medium {\n";
        html += "  color: $grey-dark;\n";
        html += "  font-family: HelveticaNeue-Medium;\n";
        html += "  font-size: 12px;\n";
        html += "}"
        break;

      case "inactive-standard-small":
        html += ".inactive-standard-small {\n";
        html += "  color: $grey-dark-blue-50;\n";
        html += "  font-family: HelveticaNeue-Bold;\n";
        html += "  font-size: 10px;\n";
        html += "  letter-spacing: 0.3px;\n";
        html += "}"
        break;

      case "inactive-standard-medium":
        html += ".inactive-standard-medium {\n";
        html += "  color: $grey-dark-blue-50;\n";
        html += "  font-family: HelveticaNeue-Bold;\n";
        html += "  letter-spacing: 0.4px;\n";
        html += "}"
        break;

      case "inactive-italic-medium":
        html += ".inactive-italic-medium {\n";
        html += "  color: $grey-dark-blue-50;\n";
        html += "  font-family: HelveticaNeue-MediumItalic;\n";
        html += "  font-size: 12px;\n";
        html += "}"
        break;

    }

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <TextArea
            label="Content"
            labelInline={ false }
            value={ this.value('content') }
            onChange={ this.action.bind(this, 'content') }
          />
        <TextDropdown
            value={ this.value('className') }
            onChange={ this.action.bind(this, 'className') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Text"
        readme="design/text"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TextDemo, AppStore);
