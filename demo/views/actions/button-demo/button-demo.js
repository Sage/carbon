import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class ButtonDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'button');
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
      <Button
        disabled={ this.value('disabled') }
        href={ this.value('href') }
        to={ this.value('to') }
        { ...props }
      >
        { this.value('text') || " " }
      </Button>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Button from 'carbon/lib/components/button';\n\n", additionalProps = false;

    html += "<Button";

    if (this.value('primary')) {
      html += "\n  as='primary'";
      additionalProps = true;
    }

    if (this.value('disabled')) {
      html += "\n  disabled={true}";
      additionalProps = true;
    }

    if (this.value('href')) {
      html += `\n  href=${this.value('href')}`;
      additionalProps = true;
    }

    if (this.value('to')) {
      html += `\n  to=${this.value('to')}`;
      additionalProps = true;
    }

    if (additionalProps) {
      html += "\n";
    }

    html += ">";

    if (additionalProps) {
      html += "\n  ";
    }

    html += this.value('text');

    if (additionalProps) {
      html += "\n";
    }

    html += "</Button>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
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

        <Row>
          <Textbox
            label="href"
            value={ this.value('href') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'href') }
            columnSpan="2"
          />

          <Textbox
            label="to"
            value={ this.value('to') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'to') }
            columnSpan="2"
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
        title="Button"
        readme="components/button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ButtonDemo, AppStore);
