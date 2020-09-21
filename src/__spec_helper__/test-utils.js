import { mount } from 'enzyme';

import { carbonThemeList } from '../style/themes';
import { mockMatchMedia } from './mock-match-media';

const isUpper = char => char.toUpperCase() === char;
const humpToDash = (acc, char) => `${acc}${isUpper(char) ? `-${char.toLowerCase()}` : char}`;

const toCSSCase = (str) => {
  return str.split('').reduce(humpToDash, '');
};

const assertStyleMatch = (styleSpec, component, opts) => {
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(toCSSCase(attr), value, opts);
  });
};

const makeArrayKeys = n => [...Array(n).keys()];

const dispatchKeyPress = (code) => {
  const ev = new KeyboardEvent('keydown', { which: code });
  document.dispatchEvent(ev);
};

const keyMap = {
  UpArrow: '38',
  DownArrow: '40',
  RightArrow: '39',
  LeftArrow: '37',
  Enter: '13',
  Tab: '9',
  Space: '32',
  Escape: '27',
  End: '35',
  Home: '36',
  D: '68',
  E: '69',
  P: '80',
  Z: '90',
  1: '49'
};

const repeat = action => (n = 1) => makeArrayKeys(n).forEach(() => action());

const keyboard = Object.keys(keyMap).reduce((acc, key) => {
  acc[`press${key}`] = () => repeat(dispatchKeyPress(keyMap[key]));
  return acc;
}, {});

// Build an object of Enzyme simulate helpers
// e.g. simulate.keydown.pressTab(target, { shiftKey: true })
// e.g. simulate.keydown.pressEscape(target)
const keydown = Object.keys(keyMap).reduce((acc, key) => {
  acc[`press${key}`] = (target, { shiftKey } = { shiftKey: false }) => {
    target.simulate('keydown', { shiftKey, key, which: parseInt(keyMap[key], 0) });
  };
  return acc;
}, {});

const simulate = {
  keydown
};

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
  const array = makeArrayKeys(num);
  const validIndexes = array.filter(isSelectableGiven(nonSelectables));


  const selectedItem = selectedItemOf(wrapper);
  const indexesThatWereSelected = array
    .reduce(selectedItemReducer(method)(wrapper), [selectedItem])
    .filter(isUnique);
  expect(arraysEqual(validIndexes, indexesThatWereSelected)).toBeTruthy();
};

const assertKeyboardTraversal = assertCorrectTraversal(() => keyboard.pressDownArrow)(expect);
const assertHoverTraversal = assertCorrectTraversal(wrapper => hoverList(wrapper))(expect);

const carbonThemesJestTable = carbonThemeList.map(theme => [theme.name, theme]);

const spacingProps = [
  ['m', 'margin'],
  ['ml', 'marginLeft'],
  ['mr', 'marginRight'],
  ['mt', 'marginTop'],
  ['mb', 'marginBottom'],
  ['mx', 'marginLeft'],
  ['mx', 'marginRight'],
  ['my', 'marginTop'],
  ['my', 'marginBottom'],
  ['p', 'padding'],
  ['pl', 'paddingLeft'],
  ['pr', 'paddingRight'],
  ['pt', 'paddingTop'],
  ['pb', 'paddingBottom'],
  ['px', 'paddingLeft'],
  ['px', 'paddingRight'],
  ['py', 'paddingTop'],
  ['py', 'paddingBottom']
];

const getDefaultValue = (value) => {
  if (typeof value === 'number') {
    return `${value * 8}px`;
  }
  return value;
};

const testStyledSystemSpacing = (component, defaults, styleContainer) => {
  describe('default props', () => {
    const wrapper = mount(component());

    it('should set the correct margins', () => {
      let marginLeft;
      let marginRight;
      let marginTop;
      let marginBottom;

      if (defaults) {
        marginLeft = getDefaultValue(defaults.ml || defaults.mx || defaults.m || undefined);
        marginRight = getDefaultValue(defaults.mr || defaults.mx || defaults.m || undefined);
        marginTop = getDefaultValue(defaults.mt || defaults.my || defaults.m || undefined);
        marginBottom = getDefaultValue(defaults.mb || defaults.my || defaults.m || undefined);
      }

      expect(assertStyleMatch(
        {
          marginLeft,
          marginRight,
          marginTop,
          marginBottom
        },
        styleContainer ? styleContainer(wrapper) : wrapper
      ));
    });

    it('should set the correct paddings', () => {
      let paddingLeft;
      let paddingRight;
      let paddingTop;
      let paddingBottom;

      if (defaults) {
        paddingLeft = getDefaultValue(defaults.pl || defaults.px || defaults.p || undefined);
        paddingRight = getDefaultValue(defaults.pr || defaults.px || defaults.p || undefined);
        paddingTop = getDefaultValue(defaults.pt || defaults.py || defaults.p || undefined);
        paddingBottom = getDefaultValue(defaults.pb || defaults.py || defaults.p || undefined);
      }

      expect(assertStyleMatch(
        {
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom
        },
        styleContainer ? styleContainer(wrapper) : wrapper
      ));
    });
  });

  describe.each(spacingProps)('when a custom spacing is specified using the "%s" styled system props',
    (styledSystemProp, propName) => {
      it(`then that ${propName} should have been set correctly`, () => {
        let wrapper = mount(component());

        const props = { [styledSystemProp]: 2 };
        wrapper = mount(component({ ...props }));

        expect(assertStyleMatch(
          { [propName]: '16px' },
          styleContainer ? styleContainer(wrapper) : wrapper
        ));
      });
    });
};

export {
  assertStyleMatch,
  toCSSCase,
  hoverList,
  selectedItemOf,
  childrenFrom,
  makeArrayKeys,
  keyboard,
  assertKeyboardTraversal,
  assertHoverTraversal,
  listFrom,
  click,
  simulate,
  carbonThemesJestTable,
  mockMatchMedia,
  testStyledSystemSpacing
};
