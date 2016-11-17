import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import Immutable from 'immutable';

import MultiStepWizard from 'components/multi-step-wizard';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';

class MultiStepWizardDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['multi_step_wizard', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'multi_step_wizard');
  }

  /**
   * @method steps
   */
  get steps() {
    let step1 = (<div className="step1">Step 1</div>),
        step2 = (<div className="step2">Step 2</div>),
        step3 = (<div className="step3">Step 3</div>);
    return [step1, step2, step3];
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <MultiStepWizard
        steps={ this.steps }
        currentStep={ parseInt(this.value('currentStep')) }
        enableInactiveSteps={ this.value('enableInactiveSteps') }
        completed={ this.value('completed') }
        onSubmit={ () => { console.log('Submit!') } }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import MultiStepWizard from 'carbon/lib/components/multi-step-wizard';\n\n";

    html += "<MultiStepWizard";

    html += "\n  steps=\{ \[\<div className\=\"step1\"\>Step 1\<\/div\>, \<div className\=\"step2\"\>Step 2\<\/div\>, \<div className\=\"step3\"\>Step 3\<\/div\>\] \}";
    html += "\n  onSubmit='' \/\/Define the custom method";
    html += `\n  currentStep='${this.value('currentStep')}'`;
    html += `\n  enableInactiveSteps='${this.value('enableInactiveSteps')}'`;
    html += `\n  completed='${this.value('completed')}'`;

    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let currentStepOpts = Immutable.fromJS([{
      id: "1",
      name: "1"
    }, {
      id: "2",
      name: "2"
    }, {
      id: "3",
      name: "3"
    }]);

    return ([
      <Row columns="3">
        <Dropdown
          options={ currentStepOpts }
          label="Current Step"
          labelInline={ true }
          value={ this.value('currentStep') }
          onChange={ this.action.bind(this, 'currentStep') }
        />

        <Checkbox
          label="Enable Inactive Steps"
          value={ this.value('enableInactiveSteps') }
          onChange={ this.action.bind(this, 'enableInactiveSteps') }
        />

        <Checkbox
          label="Completed"
          value={ this.value('completed') }
          onChange={ this.action.bind(this, 'completed') }
        />
      </Row>
    ]);
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Multi Step Wizard"
        readme="components/multi-step-wizard"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(MultiStepWizardDemo, AppStore);
