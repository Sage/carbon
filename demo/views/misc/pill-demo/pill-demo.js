import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Pill from 'components/pill';
import Row from 'components/row';
import Textbox from 'components/textbox';
import RadioButton from 'components/radio-button';

class PillDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['pill', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'pill');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='pill-demo' >
        <Pill as={ this.value('as') } >
          { this.value('text') }
        </Pill>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Pill from 'carbon/lib/components/pill';\n\n"

    html += '<Pill';
    html += ` as='${this.value('as')}' `;
    html += '/>';
    html += `\n  ${this.value('text')}`;
    html += "\n</Pill>\n\n";

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
            label="Text"
            value={ this.value('text') }
            labelInline={ true }
            onChange={ this.action.bind(this, 'text') }
            columnSpan="2"
          />

        </Row>
        <h2>As</h2>
        <Row>
          <RadioButton defaultChecked={ true } onClick={ this.action.bind(this, 'as') } name='as' value='info' label='Info'/>
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='error' label='Error' />
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='help' label='Help'/>
        </Row>
        <Row>
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='maintenance' label='Maintenance' />
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='new' label='New' />
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='success' label='Success' />
        </Row>
        <Row>
          <RadioButton onClick={ this.action.bind(this, 'as') } name='as' value='warning' label='Warning' />
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
        title="Pill"
        readme="components/pill"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(PillDemo, AppStore);
