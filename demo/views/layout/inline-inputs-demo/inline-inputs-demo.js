import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Dropdown from 'components/dropdown';
import InlineInputs from 'components/inline-inputs';

class InlineInputsDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['inline_inputs', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'inline_inputs');
  }

  /**
   * @method demo
   */
  get demo() {
    let opts = Immutable.fromJS([
      { id: 1, name: "Option One" },
      { id: 2, name: "Option Two" },
      { id: 3, name: "Option Three" },
      { id: 4, name: "Option Four" }
    ]);

    return (
      <InlineInputs label={ this.value('label') }>
        <Textbox />
        <Textbox />
        <Dropdown
          options={ opts }
          onChange={ this.action.bind(this, 'dropdown') }
          value={ this.value('dropdown') }
        />
      </InlineInputs>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Dropdown from 'carbon-react/lib/components/dropdown';\n";
    html += "import Textbox from 'carbon-react/lib/components/textbox';\n";
    html += "import InlineInput from 'carbon-react/lib/components/inline-input';\n\n";

    html += "let opts = Immutable.fromJS([\n";
    html += "  { id: 1, name: 'Option One' },\n";
    html += "  { id: 2, name: 'Option Two' },\n";
    html += "  { id: 3, name: 'Option Three' },\n";
    html += "  { id: 4, name: 'Option Four' },\n";
    html += "]);\n\n";

    html += "\n";
    html += `<InlineInput label='${this.value('label')}'>\n`;
    html += "  <Textbox />\n";
    html += "  <Textbox />\n";
    html += "  <Dropdown options={ opts } />\n";
    html += "<InlineInputs/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Textbox
          label="Label"
          value={ this.value('label') }
          onChange={ this.action.bind(this, 'label') }
        />
      </Row>
    );
  }
  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="InlineInputs"
        readme="components/inline-input"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(InlineInputsDemo, AppStore);
