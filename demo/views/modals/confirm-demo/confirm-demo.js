import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import Confirm from 'components/confirm';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class ConfirmDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['confirm', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'confirm');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Button onClick={ this.action.bind(this, 'open', { target: { value: true } } ) } >
          Click me to Open Confirm!
        </Button>
        <Confirm
          open={ this.value('open') }
          onConfirm={ this.action.bind(this, 'open', { target: { value: false } } ) }
          onCancel={ this.action.bind(this, 'open', { target: { value: false } } ) }
          title={ this.value('title') }
          enableBackgroundUI={ this.value('enableBackgroundUI') }
          size={ this.value('size') }
        >
          Are you really sure?
        </Confirm>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Confirm from 'carbon/lib/components/confirm';\n\n";

    html += "<Confirm\n";
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
        title="Confirm"
        readme="components/confirm"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ConfirmDemo, AppStore);
