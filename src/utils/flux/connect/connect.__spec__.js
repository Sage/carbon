import React from 'react'
import Store from '../store'
import connect from './connect'
import { Dispatcher } from '../flux'
import { mount } from 'enzyme'

test('It connects a single store to props', () => {
  const testStore = new Store('A', 1)

  function Presenter({ one }) {
    return <div>{one}</div>
  }

  const ConnectedComponent = connect(
    testStore,
    (testState) => ({ one: testState })
  )(Presenter)
  
  const $ = mount(<ConnectedComponent />)

  expect($.find(Presenter).props()).toEqual({ one: 1 });
})

test('It updates the component on change of a store', () => {
  const UPDATE_A = 'UPDATE_A'

  class TestStore extends Store {
    [UPDATE_A]({ value }) {
      this.data = value
    }
  }

  const testStore = new TestStore('A', 1)

  function Presenter({ one }) {
    return <div>{one}</div>
  }

  const ConnectedComponent = connect(
    testStore,
    (testState) => ({ one: testState })
  )(Presenter)

  const $ = mount(<ConnectedComponent />)

  expect($.find(Presenter).props()).toEqual({ one: 1 })

  Dispatcher.dispatch({
    actionType: UPDATE_A,
    value: 2
  })

  expect($.find(Presenter).props()).toEqual({ one: 2 })
})

test('It connects stores to props', () => {
  const testStoreA = new Store('A', 1)
  const testStoreB = new Store('B', 2)

  function Presenter({ one, two }) {
    return (
      <ul>
        <li>{one}</li>
        <li>{two}</li>
      </ul>
    )
  }

  const ConnectedComponent = connect(
    testStoreA,
    testStoreB,
    (testStateA, testStateB) => ({
      one: testStateA,
      two: testStateB
    })
  )(Presenter)

  const $ = mount(<ConnectedComponent />)
  expect($.find(Presenter).props()).toEqual({ one: 1, two: 2 })
})

test('It removes change listeners on unmount of the component', () => {
  const testStore = new Store('A', 1)

  function Presenter({ one }) {
    return <div>{one}</div>
  }

  const ConnectedComponent = connect(testStore, () => {})(Presenter)

  const $ = mount(<ConnectedComponent />)

  const removeChangeListener = jest.spyOn(testStore, 'removeChangeListener')

  expect(removeChangeListener).toHaveBeenCalledTimes(0)

  $.unmount()

  expect(removeChangeListener).toHaveBeenCalledTimes(1)
})
