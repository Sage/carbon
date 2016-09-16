import React from 'react';
import Immutable from 'immutable';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Create from 'components/create';
import Row from 'components/row';
import Textbox from 'components/textbox';

class CreateDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['create', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'create');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Create>
        { this.value('text') || " " }
      </Create>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Create from 'carbon/lib/components/create';\n\n";

    html += "<Create>";
    html += this.value('text');
    html += "</Create>\n\n";

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
        title="Create"
        readme="components/create"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(CreateDemo, AppStore);
