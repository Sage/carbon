import React from 'react';
import ScrollableListItem from './scrollable-list-item.component';

const makeArray = n => [...Array(n).keys()];

const listItemReducer = ({ nonSelectables = [], customSelectables = [] }) => {
  // generate jsx for selectable list items, based on indexes in config
  return (acc, item, index) => {
    if (nonSelectables.includes(item)) return [...acc, <div />];
    if (customSelectables.includes(item)) return [...acc, <div isSelectable />];

    return [...acc, <ScrollableListItem id={ index } />];
  };
};

const renderListItems = (opts) => {
  return makeArray(opts.num).reduce(listItemReducer(opts), []);
};


const keyPress = (code) => {
  const ev = new KeyboardEvent('keydown', { which: code });
  document.dispatchEvent(ev);
};

const keyMap = {
  UpArrow: '38',
  DownArrow: '40',
  RightArrow: '39',
  LeftArrow: '37',
  Enter: '13',
  Tab: '9'
};

const repeat = action => (n = 1) => makeArray(n).forEach(() => action());

const keyboard = Object.keys(keyMap).reduce((acc, key) => {
  acc[`press${key}`] = () => repeat(keyPress(keyMap[key]));
  return acc;
}, {});

const listFrom = wrapper => wrapper.find('ul');
const childrenFrom = node => node.children();

const hoverList = wrapper => (item) => {
  childrenFrom(listFrom(wrapper)).at(item).simulate('mouseover');
};

const simulateEvent = eventName => wrapper => wrapper.simulate(eventName);
const click = simulateEvent('click');

const selectedItemOf = wrapper => wrapper.state().selectedItem;
const isUnique = (val, index, self) => self.indexOf(val) === index;
const isSelectableGiven = nonSelectables => i => !nonSelectables.includes(i);

const selectedItemReducer = method => wrapper => (acc, i) => {
  method(wrapper)(i);
  return [...acc, selectedItemOf(wrapper)];
};

const arraysEqual = (arr1, arr2) => arr1.sort().join(',') === arr2.sort().join(',');

const assertCorrectTraversal = method => expect => ({ num, nonSelectables = [] }) => (wrapper) => {
  const array = makeArray(num);
  const validIndexes = array.filter(isSelectableGiven(nonSelectables));

  const indexesThatWereSelected = array
    .reduce(selectedItemReducer(method)(wrapper), [])
    .filter(isUnique);
  expect(arraysEqual(validIndexes, indexesThatWereSelected)).toBeTruthy();
};

const assertKeyboardTraversal = assertCorrectTraversal(() => keyboard.pressDownArrow)(expect);
const assertHoverTraversal = assertCorrectTraversal(wrapper => hoverList(wrapper))(expect);

export {
  hoverList,
  selectedItemOf,
  childrenFrom,
  renderListItems,
  keyboard,
  assertKeyboardTraversal,
  assertHoverTraversal,
  listFrom,
  click
};
