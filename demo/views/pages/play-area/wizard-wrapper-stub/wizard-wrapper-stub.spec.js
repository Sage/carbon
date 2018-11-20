import React from 'react';
import { shallow } from 'enzyme';
import WizardWrapperStub from './wizard-wrapper-stub';

describe('<WizardWrapperStub />', () => {
  let wizardWrapperStub;

  beforeAll(() => {
    wizardWrapperStub = shallow(
      <WizardWrapperStub />
    );
  });

  test('basic render', () => {
    expect(wizardWrapperStub).toMatchSnapshot();
  });
});
