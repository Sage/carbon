import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import ButtonToggle from 'components/button-toggle';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class ButtonToggleDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['button_toggle', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'button_toggle');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = { name: "sample" };

    if (this.value('icon_large')) {
      props.iconSize = "large";
    }

    return (
      <div>
        <ButtonToggle
          disabled={ this.value('disabled') }
          icon={ this.value('icon') }
          { ...props }
        >
          { this.value('option_one') || " " }
        </ButtonToggle>

        <ButtonToggle { ...props }>
          Option Two
        </ButtonToggle>

        <ButtonToggle { ...props }>
          Option Three
        </ButtonToggle>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import ButtonToggle from 'carbon/lib/components/button-toggle';\n\n";

    html += "<ButtonToggle";

    html += "\n  name='sample'";
    html += "\n  value='1'";

    if (this.value('disabled')) {
      html += "\n  disabled={true}";
    }

    if (this.value('icon_large')) {
      html += "\n  iconSize='large'";
    }

    if (this.value('icon')) {
      html += `\n  icon='${this.value('icon')}'`;
    }

    html += "\n>\n";

    html += "  ";
    html += this.value('option_one');

    html += "\n</ButtonToggle>\n\n";

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
            label="Content"
            value={ this.value('option_one') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'option_one') }
            columnSpan="3"
          />

          <Checkbox
            label="Disabled"
            value={ this.value('disabled') }
            onChange={ this.action.bind(this, 'disabled') }
          />
        </Row>

        <Row columns="4">
          <Textbox
            label="Icon"
            value={ this.value('icon') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'icon') }
            columnSpan="3"
          />

          <Checkbox
            label="Icon Large"
            value={ this.value('icon_large') }
            onChange={ this.action.bind(this, 'icon_large') }
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
        title="Button Toggle"
        readme="components/button-toggle"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ButtonToggleDemo, AppStore);
