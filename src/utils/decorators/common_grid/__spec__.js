import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import CommonGrid from './common_grid';

class TestClassOne extends React.Component {
  get gridClasses() {
    return "testGrid"
  }

  get gridHeaderClasses() {
    return 'testGridHeader';
  }

  get gridHeaderRowClasses() {
    return 'testGridHeaderRow';
  }

  get gridHeaderCellClasses() {
    return 'testGridHeaderCell';
  }

  get gridRowClasses() {
    return 'testGridRow';
  }

  get gridRowCellClasses() {
    return 'testGridRowCell';
  }

  render() {
    return <div></div>;
  }
}

class TestClassTwo extends React.Component {
  render() { return <div></div>; }
}

let ExtendedClassOne = CommonGrid(TestClassOne);
let ExtendedClassTwo = CommonGrid(TestClassTwo);

describe('CommonGrid', () => {
  let class1, class2;

  beforeEach(() => {
    class1 = TestUtils.renderIntoDocument(
      React.createElement(ExtendedClassOne)
    )

    class2 = TestUtils.renderIntoDocument(
      React.createElement(ExtendedClassTwo)
    )
  });

  describe('gridClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridClasses).toEqual('common-grid testGrid');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridClasses).toEqual('common-grid ');
      });
    });
  });

  describe('gridHeaderClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridHeaderClasses).toEqual('common-grid__header testGridHeader');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridHeaderClasses).toEqual('common-grid__header ');
      });
    });
  });

  describe('gridHeaderRowClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridHeaderRowClasses).toEqual('common-grid__header__row testGridHeaderRow');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridHeaderRowClasses).toEqual('common-grid__header__row ');
      });
    });
  });

  describe('gridHeaderCellClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridHeaderCellClasses).toEqual('common-grid__header__cell testGridHeaderCell');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridHeaderCellClasses).toEqual('common-grid__header__cell ');
      });
    });
  });

  describe('gridRowClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridRowClasses).toEqual('common-grid__row testGridRow');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridRowClasses).toEqual('common-grid__row ');
      });
    });
  });

  describe('gridRowCellClasses', () => {
    describe('when the component includes a super method', () => {
      it('returns the component class and additional decorated classes', () => {
        expect(class1.gridRowCellClasses).toEqual('common-grid__row__cell testGridRowCell');
      });
    });

    describe('when the component doesnt provide a super method', () => {
      it('returns the decorated classes', () => {
        expect(class2.gridRowCellClasses).toEqual('common-grid__row__cell ');
      });
    });
  });
});
