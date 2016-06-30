import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import AppWrapper from 'components/app-wrapper';
import Row from 'components/row';
import Textbox from 'components/textbox';

class AppWrapperDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['app_wrapper', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'app_wrapper');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <AppWrapper>
        { this.value('body') }
      </AppWrapper>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import AppWrapper from 'carbon/lib/components/app-wrapper';\n\n";

    html += `<AppWrapper>\n`;
    html += `  ${this.value('body')}\n`;
    html += "</AppWrapper>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Textbox
          label="Children"
          value={ this.value('body') }
          onChange={ this.action.bind(this, 'body') }
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
        title="App Wrapper"
        readme="components/app-wrapper"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(AppWrapperDemo, AppStore);
