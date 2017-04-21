import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';
import SizeDropdown from './../../../components/size-dropdown';

import Dialog from 'components/dialog';
import Row from 'components/row';
import Button from 'components/button';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

class DialogDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['dialog', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'dialog');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <Button onClick={ this.action.bind(this, 'open', { target: { value: true } } ) } >
          Click me to Open Dialog
        </Button>
        <Dialog
          open={ this.value('open') }
          onCancel={ this.action.bind(this, 'open', { target: { value: false } } ) }
          title={ this.value('title') }
          subtitle={ this.value('subtitle') }
          enableBackgroundUI={ this.value('enableBackgroundUI') }
          showCloseIcon={ this.value('showCloseIcon') }
          closeOnBackgroundClick={ this.value('closeOnBackgroundClick') }
          closeOnESCKey={ this.value('closeOnESCKey') }
          size={ this.value('size') }
        >
          <Row>
            <Textbox />
            <Textbox />
          </Row>
        </Dialog>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Dialog from 'carbon/lib/components/dialog';\n\n";

    html += "<Dialog\n";
    html += `  open={ ${ this.value('open') } }\n`
    html += `  title="${ this.value('title') }"\n`;
    html += `  subtitle="${ this.value('subtitle') }"\n`;

    if (!this.value('showCloseIcon')) {
      html += `  showCloseIcon={ false }\n`;
    }

    if (this.value('size') !== 'med') {
      html += `  size='${ this.value('size') }'\n`;
    }

    if (!this.value('closeOnBackgroundClick')) {
      html += `  closeOnBackgroundClick={ false }\n`;
    }

    if (this.value('enableBackgroundUI')) {
      html += `  enableBackgroundUI={ true }\n`;
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
          <Textbox
            label="Subtitle"
            labelInline={ true }
            value={ this.value('subtitle') }
            onChange={ this.action.bind(this, 'subtitle') }
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
        <Row>
          <Checkbox
            label="Close on ESC Key"
            value={ this.value('closeOnESCKey') }
            reverse={ true }
            onChange={ this.action.bind(this, 'closeOnESCKey') }
          />
          <Checkbox
            label="Close on Background Click"
            value={ this.value('closeOnBackgroundClick') }
            disabled={ this.value('enableBackgroundUI') }
            reverse={ true }
            onChange={ this.action.bind(this, 'closeOnBackgroundClick') }
          />
          <Checkbox
            label="Show Close Icon"
            value={ this.value('showCloseIcon') }
            reverse={ true }
            onChange={ this.action.bind(this, 'showCloseIcon') }
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
        title="Dialog"
        readme="components/dialog"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DialogDemo, AppStore);
