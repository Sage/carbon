import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Toast from 'components/toast';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Textarea from 'components/textarea';

class ToastDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['toast', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'toast');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = {}

    if (this.value('dismissable')) {
      props.onDismiss = this.action.bind(this, 'open', { target: { value: false } });
    }

    return (
      <Toast
        as={ this.value('as') }
        open={ this.value('open') }
        { ...props }
      >
        { this.value('text') || " " }
      </Toast>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Toast from 'carbon/lib/components/toast';\n\n";

    html += "<Toast";
    html += `\n  open={${this.value('open')}}`;
    html += `\n  as='${this.value('as')}'`;
    html += "\n>\n";
    html += `  ${this.value('text')}`;
    html += "\n</Toast>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Textarea
            label="Content"
            value={ this.value('text') }
            onChange={ this.action.bind(this, 'text') }
          />
        </Row>

        <Row>
          <AsDropdown
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
          />
          <Checkbox
            label="Open"
            value={ this.value('open') }
            onChange={ this.action.bind(this, 'open') }
          />
          <Checkbox
            label="Dismissable"
            value={ this.value('dismissable') }
            onChange={ this.action.bind(this, 'dismissable') }
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
        title="Toast"
        readme="components/toast"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ToastDemo, AppStore);
