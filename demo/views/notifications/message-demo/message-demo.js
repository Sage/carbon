import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Message from 'components/message';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Textarea from 'components/textarea';

class MessageDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['message', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'message');
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
      <Message
        as={ this.value('as') }
        transparent={ this.value('transparent') }
        open={ this.value('open') }
        title={ this.value('title') }
        { ...props }
      >
        { this.value('text') || " " }
      </Message>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Message from 'carbon/lib/components/message';\n\n";

    html += "<Message";
    html += `\n  as='${this.value('as')}'`;
    html += `\n  transparent='${false}'`;
    html += `\n  open='${true}'`;
    html += `\n  title='${this.value('title')}'`;
    html += "\n>\n";
    html += `  ${this.value('text')}`;
    html += "\n</Message>\n\n";

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
            label="Title"
            value={ this.value('title') }
            onChange={ this.action.bind(this, 'title') }
          />
        </Row>
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
            label="Transparent"
            value={ this.value('transparent') }
            onChange={ this.action.bind(this, 'transparent') }
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
        title="Message"
        readme="components/message"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(MessageDemo, AppStore);
