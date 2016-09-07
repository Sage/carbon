import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Flash from 'components/flash';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Textarea from 'components/textarea';

class FlashDemo extends React.Component {
  get message() {
    return { description: { first_name: "is required", last_name: "This is too long ::more:: This sentence is proxied to a dialog." } }
  }

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['flash', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'flash');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Flash
        as={ this.value('as') }
        open={ this.value('open') }
        message={ this.message }
        onDismiss={ this.action.bind(this, 'open', { target: { value: false } }) }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Flash from 'carbon/lib/components/flash';\n\n";

    html += "<Flash";
    html += `\n  open={${this.value('open')}}`;
    html += `\n  as='${this.value('as')}'`;
    html += `\n  message='${this.value('text')}'`;
    html += "\n/>\n\n";

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
        title="Flash"
        readme="components/flash"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(FlashDemo, AppStore);
