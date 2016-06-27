import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import { Sidebar, SidebarHeader } from 'components/sidebar';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class SidebarDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['sidebar', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'sidebar');
  }

  /**
   * @method demo
   */
  get demo() {
    let button;

    if (this.value('open')) {
      button = (
        <Button onClick={ this.action.bind(this, 'open', { target: { value: false } } ) } >
          Click me to Close Sidebar
        </Button>
      );
    } else {
      button = (
        <Button onClick={ this.action.bind(this, 'open', { target: { value: true } } ) } >
          Click me to Open Sidebar 
        </Button>
      );
    }

    let position = this.value('positionLeft') ? 'left' : 'right';

    return (
      <div>
        { button }
        <Sidebar
          open={ this.value('open') }
          onCancel={ this.action.bind(this, 'open', { target: { value: false } } ) }
          enableBackgroundUI={ this.value('enableBackgroundUI') }
          position={ position }
        >
          <SidebarHeader>
            <h3>Header for sidebar.</h3>
          </SidebarHeader>

          Content for sidebar.
        </Sidebar>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Sidebar from 'carbon/lib/components/sidebar';\n\n";

    html += "<Sidebar\n";
    html += `  open={ ${ this.value('open') } }\n`

    if (!this.value('enableBackgroundUI')) {
      html += `  enableBackgroundUI={ false }\n`
    }

    if (this.value('positionLeft')) {
      html += `  position='left'\n`
    }
    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Checkbox
            label="Enable Background UI"
            value={ this.value('enableBackgroundUI') }
            reverse={ true }
            onChange={ this.action.bind(this, 'enableBackgroundUI') }
          />
          <Checkbox
            label="Position Left"
            value={ this.value('positionLeft') }
            reverse={ true }
            onChange={ this.action.bind(this, 'positionLeft') }
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
        title="Sidebar"
        readme="components/sidebar"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(SidebarDemo, AppStore);
