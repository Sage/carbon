import React from 'react';
import { mount } from 'enzyme';
import Immutable from 'immutable';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import I18n from 'i18n-js';
import guid from '../../utils/helpers/guid';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import mintTheme from '../../style/themes/mint';
import baseTheme from '../../style/themes/base';
import Pager from './pager.component';
import Dropdown from '../../__deprecated__/components/dropdown';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

const pageSizeSelectionOptions = Immutable.fromJS([
  { id: '10', name: 10 },
  { id: '25', name: 25 },
  { id: '50', name: 50 }
]);

function render(props, renderType = mount) {
  return renderType(
    <ThemeProvider theme={ props.theme }>
      <Pager { ...props } />
    </ThemeProvider>
  );
}

describe('Pager', () => {
  const props = {
    currentPage: '1',
    totalRecords: 100,
    onPagination: () => true,
    pageSize: '10',
    showPageSizeSelection: true,
    pageSizeSelectionOptions
  };

  it('renders the Pager correctly with the Classic Theme', () => {
    const wrapper = render(
      { ...props, onPagination: () => true, theme: classicTheme },
      TestRenderer.create
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the Pager correctly with the Mint Theme', () => {
    const wrapper = render(
      { ...props, onPagination: () => true, theme: mintTheme },
      TestRenderer.create
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('i18n', () => {
    const { translations } = I18n;
    const { locale } = I18n.locale;
    beforeAll(() => {
      I18n.translations = {
        ...translations,
        fr: {
          ...translations.fr,
          pager: {
            show: 'Spectacle',
            records: {
              one: 'article',
              zero: 'articles',
              other: 'articles'
            }
          }
        }
      };
    });

    afterAll(() => {
      I18n.translations = translations;
      I18n.locale = locale;
    });

    const getShow = wrapper => wrapper.find("div[data-element='page-select']").getDOMNode().parentElement.firstChild
      .textContent;
    const getRecords = wrapper => wrapper.find("div[data-element='page-select']").getDOMNode().parentElement.lastChild
      .textContent;
    const getTotalRecords = wrapper => wrapper.getDOMNode().lastChild.textContent;

    describe('default', () => {
      it('show', () => {
        const wrapper = render({ ...props, theme: mintTheme });
        expect(getShow(wrapper)).toBe('Show');
      });

      it('records', () => {
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 100 }))).toBe('items');
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 1 }))).toBe('item');
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 0 }))).toBe('items');
        expect(getRecords(render({ ...props, theme: classicTheme, totalRecords: 100 }))).toBe('records');
        expect(getRecords(render({ ...props, theme: classicTheme, totalRecords: 1 }))).toBe('record');
        expect(getRecords(render({ ...props, theme: classicTheme, totalRecords: 0 }))).toBe('records');
      });

      it('total records', () => {
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 100 }))).toBe('100 items');
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 1 }))).toBe('1 item');
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 0 }))).toBe('0 items');
        expect(getTotalRecords(render({ ...props, theme: classicTheme, totalRecords: 100 }))).toBe('100 records');
        expect(getTotalRecords(render({ ...props, theme: classicTheme, totalRecords: 1 }))).toBe('1 record');
        expect(getTotalRecords(render({ ...props, theme: classicTheme, totalRecords: 0 }))).toBe('0 records');
      });
    });

    describe('fr', () => {
      beforeAll(() => {
        I18n.locale = 'fr';
      });

      it('show', () => {
        const wrapper = render({ ...props, theme: mintTheme });
        expect(getShow(wrapper)).toBe('Spectacle');
      });

      it('records', () => {
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 100 }))).toBe('articles');
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 1 }))).toBe('article');
        expect(getRecords(render({ ...props, theme: mintTheme, totalRecords: 0 }))).toBe('articles');
      });

      it('total records', () => {
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 100 }))).toBe('100 articles');
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 1 }))).toBe('1 article');
        expect(getTotalRecords(render({ ...props, theme: mintTheme, totalRecords: 0 }))).toBe('0 articles');
      });
    });
  });

  describe('Classic theme', () => {
    it('has correct styles for PagerContainerStyles', () => {
      const wrapper = render({ ...props, theme: classicTheme }, TestRenderer.create).toJSON();
      assertStyleMatch({
        padding: '3px 16px',
        fontSize: '14px',
        backgroundColor: '#F2F4F5'
      }, wrapper);
    });
  });

  describe('DLS theme', () => {
    describe('Pager styling', () => {
      it('matches the expected style', () => {
        const wrapper = render(
          {
            ...props,
            theme: mintTheme
          },
          mount
        );

        assertStyleMatch({
          padding: '9px 24px',
          fontSize: '13px',
          border: `1px solid ${baseTheme.table.selected}`,
          backgroundColor: baseTheme.table.zebra,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: '0'
        }, wrapper);
      });
    });

    describe('Size Selector', () => {
      it('navigates correctly on page size update', () => {
        const onPagination = jest.fn();
        const wrapper = render(
          {
            ...props,
            currentPage: '4',
            onPagination,
            theme: mintTheme
          },
          mount
        );
        const dropdown = wrapper.find(Dropdown);
        dropdown.instance().selectValue('25', '25');
        expect(onPagination).toHaveBeenCalledWith('1', '25', 'size');
      });
    });
  });
});
