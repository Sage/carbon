import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Tooltip from 'components/tooltip';
import RadioButton from 'components/radio-button';
import Row from 'components/row';

class TooltipDemo extends React.Component {
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
        <Tooltip pointerAlign={ this.value('pointerAlign') } pointerPosition={ this.value('pointerPosition') } showTooltip={ true }>
          Tooltips are a fundamental part of the user experience.
        </Tooltip>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Tooltip from 'carbon/lib/components/tooltip';\n\n";

    html += '<Tooltip\n'
    html += '  showTooltip={ toggleTooltipHandler }\n';

    if (this.value('pointerAlign')){
      html += '  pointerAlign="left"\n'
    }
    if (this.value('pointerPosition')) {
      html += '  pointerPosition="down"\n'
    }
    html += '>\n'
    html += '  Tooltips are a fundamental part of the user experience.\n';
    html += '</Tooltip>\n'
    html += '\n'
    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return(
      <div>
        <Row className='props-row'>
          <h5 className='row-label'>Tooltip Position</h5>
          <RadioButton
            label='Left'
            name='pointerPosition'
            onChange={ this.action.bind(this, 'pointerPosition')}
            value='left'
          />
          <RadioButton
            label='Down'
            name='pointerPosition'
            onChange={ this.action.bind(this, 'pointerPosition')}
            value='down'
          />
          <RadioButton
            defaultChecked={ true }
            label='Up'
            name='pointerPosition'
            onChange={ this.action.bind(this, 'pointerPosition')}
            value='up'
          />
          <RadioButton
            label='Right'
            name='pointerPosition'
            onChange={ this.action.bind(this, 'pointerPosition')}
            value='right'
          />
        </Row>
        <Row className='props-row'>
          <h5 className='row-label'>Pointer Alignment</h5>
          <RadioButton
            disabled={ this.value('pointerPosition') === 'right' || this.value('pointerPosition') === 'left'}
            label='Left'
            name='pointerAlign'
            onChange={ this.action.bind(this, 'pointerAlign')}
            value='left'
          />
          <RadioButton
            defaultChecked={ true }
            label='Center'
            name='pointerAlign'
            onChange={ this.action.bind(this, 'pointerAlign')}
            value='center'
          />
          <RadioButton
            disabled={ this.value('pointerPosition') === 'right' || this.value('pointerPosition') === 'left'}
            label='Right'
            name='pointerAlign'
            onChange={ this.action.bind(this, 'pointerAlign')}
            value='right'
          />
          <RadioButton
            disabled={ this.value('pointerPosition') === 'down' || this.value('pointerPosition') === 'up'}
            label='Up'
            name='pointerAlign'
            onChange={ this.action.bind(this, 'pointerAlign')}
            value='up'
          />
          <RadioButton
            disabled={ this.value('pointerPosition') === 'down' || this.value('pointerPosition') === 'up'}
            label='Down'
            name='pointerAlign'
            onChange={ this.action.bind(this, 'pointerAlign')}
            value='down'
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
        title='Tooltip'
        readme='components/tooltip'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(TooltipDemo, AppStore);
