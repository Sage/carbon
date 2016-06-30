import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import NavigationBar from 'components/navigation-bar';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class NavigationBarDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['navigation_bar', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'navigation_bar');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = {};

    if (this.value('secondary')) {
      props.as = "secondary";
    }

    return (
      <NavigationBar { ...props }>
      </NavigationBar>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import NavigationBar from 'carbon/lib/components/navigation-bar';\n\n";

    html += `<NavigationBar>\n`;
    html += "</NavigationBar>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <Row>
        <Checkbox
          label="Secondary"
          value={ this.value('secondary') }
          onChange={ this.action.bind(this, 'secondary') }
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
        title="Navigation Bar"
        readme="components/navigation-bar"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(NavigationBarDemo, AppStore);
