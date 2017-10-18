import React from 'react';
import { shallow } from 'enzyme';
import { Row, Column } from './row';

describe('Row', () => {
  let wrapper;

  describe('render', () => {
    it('renders a parent div with calculated CSS classes', () => {
      wrapper = shallow(<Row />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('columns', () => {
    describe('when column number is not passed', () => {
      it('determines the columns from the number of children', () => {
        wrapper = shallow(
          <Row>
            <Column />
            <Column />
            <Column />
            <Column />
          </Row>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when column number is passed', () => {
      it('sets the passed column as the number of columns', () => {
        wrapper = shallow(
          <Row columns='50'>
            <Column />
          </Row>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when a null column is passed', () => {
      it('ignores the null child', () => {
        const columns = [<Column />, <Column />, null];

        wrapper = shallow(
          <Row>
            { columns }
          </Row>
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('gutter', () => {
    it('applies a gutter class', () => {
      wrapper = shallow(<Row />);
      wrapper.setProps({ gutter: 'small' });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('columnDivide', () => {
    describe('when columnDivide is true', () => {
      it('passes columnDivide to its children', () => {
        wrapper = shallow(
          <Row>
            <Column />
          </Row>
        );
        wrapper.setProps({ columnDivide: true });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('columnClasses', () => {
    it('passes the prop to its children', () => {
      wrapper = shallow(
        <Row>
          <Column />
        </Row>
      );
      wrapper.setProps({ columnClasses: 'myChildClasses' });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
