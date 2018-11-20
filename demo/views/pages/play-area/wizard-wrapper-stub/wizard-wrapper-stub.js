import Button from 'components/button';
import React from 'react';
import Wizard from 'components/wizard';

class WizardWrapperStub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        { label: 'foo', state: 'complete' },
        { label: 'bar', state: 'current' },
        { label: 'baz', state: 'incomplete' }
      ],
      current: 2
    };
  }

  setStepState = current => (step, i) => {
    let state = 'incomplete';
    if (current === i) { state = 'current'; }
    if (current > i) { state = 'complete'; }
    console.log({ state, label: step.label });
    return { state, label: step.label };
  };

  previous = () => {
    let { current, steps } = this.state;

    current = current === 0 ? 0 : current - 1;

    steps = steps.map(this.setStepState(current));

    this.setState({ current, steps });
  }

  next = () => {
    let { current } = this.state;
    let { steps } = this.state;

    current = current === steps.length - 1 ? current : current + 1;

    steps = steps.map(this.setStepState(current));

    this.setState({ current, steps });
  }

  render() {
    return (
      <div className='demo-wizard-wrapper-stub'>
        <Wizard { ...this.state }>
          <div>Step 1</div>
          <div>Step 2</div>
          <div>Step 3</div>
        </Wizard>

        <div className='demo-wizard-wrapper-stub__buttons'>
          <Button onClick={ this.previous }>Previous</Button>
          <Button onClick={ this.next }>Next</Button>
        </div>
      </div>
    );
  }
}

export default WizardWrapperStub;
