import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Spinner from 'components/spinner';
import Row from 'components/row';
import RadioButton from 'components/radio-button';

class SpinnerDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['spinner', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'spinner');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='spinner-demo__spinner' >
        <Spinner as={ this.value('as') } size={ this.value('size') } />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Spinner from 'carbon/lib/components/spinner';\n\n";

    html += "<Spinner";
    html += ` as={ ${this.value('as')} }`
    html += ` size={ ${this.value('size')} }`
    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <h2>Size</h2>
        <Row>
          <RadioButton onClick={ this.action.bind(this, 'size') } name='size' value='small' label='Small'/>
          <RadioButton onClick={ this.action.bind(this, 'size') } name='size' value='smed'  label='Small-Medium' />
          <RadioButton defaultChecked={ true } onClick={ this.action.bind(this, 'size') } name='size' value='lmed'  label='Large-Medium'/>
          <RadioButton onClick={ this.action.bind(this, 'size') } name='size' value='large' label='Large' />
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
        title="Spinner"
        readme="components/spinner"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(SpinnerDemo, AppStore);
