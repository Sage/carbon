import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import ToolTip from 'components/tooltip';
import RadioButton from 'components/radio-button';
import Row from 'components/row';

class ToolTipDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['tooltip', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'tooltip');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div className='tooltip-demo'>
        <ToolTip align={ this.value('align') } position={ this.value('position') }>
          Icons are a fundamental part of the user experience. They can help to communicate, guide and inform the user. Icons make the meaning of buttons clearer.
        </ToolTip>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "ToolTip from 'carbon/lib/components/tooltip';\n\n";

    html += '<ToolTip>\n';
    html += '\tIcons are a fundamental part of the user experience.\n';
    html += '\tThey can help to communicate, guide and inform the user.\n';
    html += '\tIcons make the meaning of buttons clearer.\n';
    html += '</ToolTip>'

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return(
      <div>
        <Row className='props-row'>
          <h5 className='row-label'>Pointer Position</h5>
          <RadioButton
            label='Left'
            name='position'
            onChange={ this.action.bind(this, 'position')}
            value='left'
          />
          <RadioButton
            defaultChecked={ true }
            label='Bottom'
            name='position'
            onChange={ this.action.bind(this, 'position')}
            value='bottom'
          />
          <RadioButton
            label='Top'
            name='position'
            onChange={ this.action.bind(this, 'position')}
            value='top'
          />
          <RadioButton
            label='Right'
            name='position'
            onChange={ this.action.bind(this, 'position')}
            value='right'
          />
        </Row>
        <Row className='props-row'>
          <h5 className='row-label'>Pointer Alignment</h5>
          <RadioButton
            disabled={ this.value('position') === 'right' || this.value('position') === 'left'}
            label='Left'
            name='align'
            onChange={ this.action.bind(this, 'align')}
            value='left'
          />
          <RadioButton
            defaultChecked={ true }
            label='Center'
            name='align'
            onChange={ this.action.bind(this, 'align')}
            value='center'
          />
          <RadioButton
            disabled={ this.value('position') === 'right' || this.value('position') === 'left'}
            label='Right'
            name='align'
            onChange={ this.action.bind(this, 'align')}
            value='right'
          />
          <RadioButton
            disabled={ this.value('position') === 'bottom' || this.value('position') === 'top'}
            label='Top'
            name='align'
            onChange={ this.action.bind(this, 'align')}
            value='top'
          />
          <RadioButton
            disabled={ this.value('position') === 'bottom' || this.value('position') === 'top'}
            label='Bottom'
            name='align'
            onChange={ this.action.bind(this, 'align')}
            value='bottom'
          />
        </Row>
      </div>
    );

    return null;
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title='ToolTip'
        readme='components/tooltip'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ToolTipDemo, AppStore);
