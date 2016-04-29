import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import DialogFullScreen from 'components/dialog-full-screen';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class DialogFullScreenDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['dialog_full_screen', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'dialog_full_screen');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Button onClick={ this.action.bind(this, 'open', { target: { value: true } } ) } >
          Click me to open a Full Screen Dialog
        </Button>
        <DialogFullScreen
          open={ this.value('open') }
          onCancel={ this.action.bind(this, 'open', { target: { value: false } } ) }
          title={ this.value('title') }
          disableBackground={ this.value('disableBackground') }
        >
          <p>This is full screen!</p>
        </DialogFullScreen>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import DialogFullScreen from 'carbon/lib/components/dialog-full-screen';\n\n";

    html += "<DialogFullScreen\n";
    html += `  open={ ${ this.value('open') } }\n`
    html += `  title="${ this.value('title') }"\n`;

    if (this.value('disableBackground')) {
      html += `  disableBackground={ true }\n`;
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
          <Textbox
            label="Title"
            labelInline={ true }
            value={ this.value('title') }
            onChange={ this.action.bind(this, 'title') }
          />
          <Checkbox
            label="Disable Background"
            value={ this.value('disableBackground') }
            reverse={ true }
            onChange={ this.action.bind(this, 'disableBackground') }
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
        title="Dialog Full Screen"
        readme="components/dialog"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DialogFullScreenDemo, AppStore);
