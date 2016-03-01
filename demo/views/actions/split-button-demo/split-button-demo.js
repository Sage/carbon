import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import SplitButton from 'components/split-button';
import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class SplitButtonDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['split_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'split_button');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = {};

    if (this.value('primary')) {
      props.as = "primary";
    }

    return (
      <SplitButton
        text={ this.value('text') || " " }
        disabled={ this.value('disabled') }
        { ...props }
      >
        <Button>Action One</Button>
        <Button>Action Two</Button>
        <Button>Action Three</Button>
      </SplitButton>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import SplitButton from 'carbon/lib/components/split-button';\n\n";

    html += "<SplitButton";

    html += `\n  text='${this.value('text')}'`;

    if (this.value('primary')) {
      html += "\n  as='primary'";
    }

    if (this.value('disabled')) {
      html += "\n  disabled={true}";
    }

    html += "\n>";
    html += "\n  <Button>Action One</Button>";
    html += "\n  <Button>Action Two</Button>";
    html += "\n  <Button>Action Three</Button>";
    html += "\n</SplitButton>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row columns="4">
        <Textbox
          label="Text"
          value={ this.value('text') }
          labelInline={ true }
          onChange={ this.action.bind(this, 'text') }
          columnSpan="2"
        />

        <Checkbox
          label="Primary"
          value={ this.value('primary') }
          onChange={ this.action.bind(this, 'primary') }
        />

        <Checkbox
          label="Disabled"
          value={ this.value('disabled') }
          onChange={ this.action.bind(this, 'disabled') }
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
        title="Split Button"
        readme="components/split-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(SplitButtonDemo, AppStore);
