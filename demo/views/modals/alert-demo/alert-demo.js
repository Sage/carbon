import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import Alert from 'components/alert';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class AlertDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['alert', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'alert');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Button onClick={ this.action.bind(this, 'open', { target: { value: true } } ) } >
          Click me to Open Alert!
        </Button>
        <Alert
          open={ this.value('open') }
          onCancel={ this.action.bind(this, 'open', { target: { value: false } } ) }
          title={ this.value('title') }
          enableBackgroundUI={ this.value('enableBackgroundUI') }
          size={ this.value('size') }
        >
        Thought we should alert you
        </Alert>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Alert from 'carbon/lib/components/alert';\n\n";

    html += "<Alert\n";
    html += `  open={ ${ this.value('open') } }\n`
    html += `  title="${ this.value('title') }"\n`;

    if (this.value('enableBackgroundUI')) {
      html += `  enableBackgroundUI={ true }\n`;
    }

    if (this.value('size') !== 'xsmall') {
      html += `  size='${ this.value('size') }'\n`;
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
            label="Enable Background UI"
            value={ this.value('enableBackgroundUI') }
            reverse={ true }
            onChange={ this.action.bind(this, 'enableBackgroundUI') }
          />
          <SizeDropdown
            label="Size"
            value={ this.value('size') }
            onChange={ this.action.bind(this, 'size') }
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
        title="Alert"
        readme="components/alert"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(AlertDemo, AppStore);
