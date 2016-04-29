import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Tooltip from 'components/tooltip';
import RadioButton from 'components/radio-button';
import Row from 'components/row';
import TextArea from 'components/textarea';

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
        <Tooltip
          align={ this.value('align') }
          position={ this.value('position') }
          isVisible={ true }
        >
          { this.value('message') }
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
    html += '  isVisible={ toggleTooltipHandler }\n';

    if (this.value('align')){
      html += '  align={ this.props.align }\n'
    }
    if (this.value('position')) {
      html += '  position={ this.props.position }\n'
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
        <Row className='tooltip-demo__row--props'>
          <h5 className='.tooltip-demo__row-label'>Position</h5>
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
        <Row className='tooltip-demo__row--props'>
          <h5 className='.tooltip-demo__row-label'>Alignment</h5>
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
        <Row className='tooltip-demo__row--message'>
          <TextArea
            name='message'
            label='Tooltip Message'
            onChange={ this.action.bind(this, 'message') }
            value={ this.value('message') }
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
