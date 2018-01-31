import React from 'react';
import { mount, shallow } from 'enzyme';
import Store from '../store';
import connect from './connect';
import { Dispatcher } from '../flux';
import { watch } from 'fs';
import { shallowToJson } from 'enzyme-to-json';

describe('connect', () => {
  it('connects a single store to props', () => {
    const testStore = new Store('A', 1);
    const Presenter = () => null;
    const ConnectedComponent = connect(
      testStore,
      testState => ({ one: testState })
    )(Presenter);
    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.find(Presenter).props()).toEqual({ one: 1 });
  });

  it('updates the component on change of a store', () => {
    const UPDATE_A = 'UPDATE_A';
    class TestStore extends Store {
      [UPDATE_A]({ value }) {
        this.data = value;
      }
    }
    const testStore = new TestStore('A', 1);
    const Presenter = () => null;
    const ConnectedComponent = connect(
      testStore,
      testState => ({ one: testState })
    )(Presenter);

    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.find(Presenter).props()).toEqual({ one: 1 });

    Dispatcher.dispatch({
      actionType: UPDATE_A,
      value: 2
    });

    wrapper.update();

    expect(wrapper.find(Presenter).props()).toEqual({ one: 2 });
  });

  it('connects stores to props', () => {
    const testStoreA = new Store('A', 1);
    const testStoreB = new Store('B', 2);
    const Presenter = () => null;
    const ConnectedComponent = connect(
      testStoreA,
      testStoreB,
      (testStateA, testStateB) => ({
        one: testStateA,
        two: testStateB
      })
    )(Presenter);
    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.find(Presenter).props()).toEqual({ one: 1, two: 2 });
  });

  it('removes change listeners on unmount of the component', () => {
    const testStore = new Store('A', 1);
    const Presenter = () => null;
    const ConnectedComponent = connect(testStore, () => {})(Presenter);
    const wrapper = mount(<ConnectedComponent />);
    const removeChangeListener = jest.spyOn(testStore, 'removeChangeListener');

    expect(removeChangeListener).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(removeChangeListener).toHaveBeenCalledTimes(1);
  });

  it('passes props through to mapStateToProps', () => {
    const testStore = new Store('A', 1);
    const mapStateToProps = jest.fn();
    const Presenter = () => null;
    const ConnectedComponent = connect(testStore, mapStateToProps)(Presenter);
    const wrapper = mount(<ConnectedComponent mockProp />);

    expect(mapStateToProps).toHaveBeenCalledWith(testStore.getState(), wrapper.props());
  });

  it('props from mapStateToProps take precedence', () => {
    const Presenter = () => null;
    const mapStateToProps = props => ({ text: `modified ${props.text}` });
    const ConnectedComponent = connect(mapStateToProps)(Presenter);
    const wrapper = shallow(
      <ConnectedComponent text={ 'sample text' } />
    );

    expect(wrapper.prop('text')).toBe('modified sample text');
  });

  it('sets the default component name for class based components', () => {
    const testStore = new Store('A', 1);
    class MockComponent extends React.Component {
      render() {
        return null;
      }
    }
    const ConnectedComponent = connect(testStore, () => {})(MockComponent);
    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.name()).toBe('Connect(MockComponent)');
  });

  it('sets the default component name for functional components', () => {
    const testStore = new Store('A', 1);
    const MockComponent = () => null
    const ConnectedComponent = connect(testStore, () => {})(MockComponent);
    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.name()).toBe('Connect(MockComponent)');
  });

  it('Sets the component name for anonymous components', () => {
    const testStore = new Store('A', 1);
    const ConnectedComponent = connect(testStore, () => {})(() => null);
    const wrapper = mount(<ConnectedComponent />);

    expect(wrapper.name()).toBe('Connect(Component)');
  });
});
