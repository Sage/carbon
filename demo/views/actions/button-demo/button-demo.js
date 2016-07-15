import React from 'react';
import Immutable from 'immutable';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';

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
    return (
      <Button
        disabled={ this.value('disabled') }
        href={ this.value('href') }
        to={ this.value('to') }
        as={ this.value('as') }
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

    if (this.value('as')) {
      html += `\n  as='${this.value('as')}'`;
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
          />

          <Textbox
            label="to"
            value={ this.value('to') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'to') }
          />

          <Dropdown
            label="As"
            value={ this.value('as') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'as') }
            options={ Immutable.fromJS([{
              id: 'primary',
              name: 'Primary'
            }, {
              id: 'secondary',
              name: 'Secondary'
            }, {
              id: 'green',
              name: 'Green'
            }, {
              id: 'red',
              name: 'Red'
            }]) }
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
