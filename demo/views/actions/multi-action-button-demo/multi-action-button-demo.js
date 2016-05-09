import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import Immutable from 'immutable';

import Dropdown from 'components/dropdown';
import MultiActionButton from 'components/multi-action-button';
import Button from 'components/button';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class MultiActionButtonDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['multi_action_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'multi_action_button');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <MultiActionButton
        text={ this.value('text') || " " }
        disabled={ this.value('disabled') }
        as={ this.value('as') }
        align={ this.value('align_right') ? "right" : "" }
      >
        <Button>Action One</Button>
        <Button>Action Two</Button>
        <Button>Action Three</Button>
      </MultiActionButton>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import MultiActionButton from 'carbon/lib/components/multi-action-button';\n\n";

    html += "<MultiActionButton";

    html += `\n  text='${this.value('text')}'`;

    if (this.value('as') !== 'secondary' ) {
      html += `\n  as='${ this.value('as') }'`;
    }

    if (this.value('disabled')) {
      html += "\n  disabled={true}";
    }

    html += "\n>";
    html += "\n  <Button>Action One</Button>";
    html += "\n  <Button>Action Two</Button>";
    html += "\n  <Button>Action Three</Button>";
    html += "\n</MultiActionButton>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let opts = Immutable.fromJS([{
      id: "primary",
      name: "Primary"
    }, {
      id: "secondary",
      name: "Secondary"
    }, {
      id: "transparent",
      name: "Transparent"
    }]);

    return (
      <Row columns="6">
        <Textbox
          label="Text"
          value={ this.value('text') }
          labelInline={ true }
          onChange={ this.action.bind(this, 'text') }
          columnSpan="2"
        />

        <Dropdown
          options={ opts }
          label="As"
          labelInline={ true }
          value={ this.value('as') }
          onChange={ this.action.bind(this, 'as') }
          columnSpan="2"
        />

        <Checkbox
          label="Disabled"
          value={ this.value('disabled') }
          onChange={ this.action.bind(this, 'disabled') }
        />

        <Checkbox
          label="Align Right"
          value={ this.value('align_right') }
          onChange={ this.action.bind(this, 'align_right') }
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
        title="Multi Action Button"
        readme="components/multi-action-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(MultiActionButtonDemo, AppStore);
