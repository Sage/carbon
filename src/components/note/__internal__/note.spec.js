import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import Note from './note.component';
import baseTheme from '../../../style/themes/base';
import {
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent
} from './note.style';
import StatusWithTooltip from './status-with-tooltip';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Tooltip from '../../tooltip';

function render(props = {}) {
  return mount(
    <ThemeProvider theme={ baseTheme }>
      <Note { ...props } />
    </ThemeProvider>
  );
}

describe('Note', () => {
  describe('Styling', () => {
    it('matches the expected', () => {
      const wrapper = render();

      assertStyleMatch({
        backgroundColor: `${baseTheme.colors.white}`,
        border: `1px solid ${baseTheme.tile.border}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        position: 'relative',
        width: '100%',
        minWidth: '314px'

      }, wrapper);

      const content = wrapper.find(StyledNoteContent);

      assertStyleMatch({
        position: 'relative',
        width: '100%'
      }, content);

      assertStyleMatch({
        paddingBottom: '24px'
      }, content, { modifier: ':not(:last-of-type)' });

      assertStyleMatch({
        borderTop: `solid 1px ${baseTheme.tile.separator}`
      }, content, { modifier: `+ ${StyledNoteContent}` });
    });

    it('supports dynamic sizing by setting the "width" prop', () => {
      assertStyleMatch({
        width: '75%'
      }, render({ width: 75 }));
    });
  });

  describe('StyledTitle', () => {
    const title = 'title';

    it('does not render the "title" when prop is undefined', () => {
      expect(render().find(StyledTitle).exists()).toBeFalsy();
    });

    it('renders the "title" with expected styling when prop has value', () => {
      const wrapper = render({ title });

      assertStyleMatch({
        fontWeight: '900',
        fontSize: '16px',
        lineHeight: '21px',
        paddingBottom: '16px'
      }, wrapper.find(StyledTitle));

      expect(wrapper.find(StyledTitle).exists()).toBeTruthy();
    });
  });

  describe('StyledInlineControl', () => {
    const inlineControl = <div>inlineControl</div>;

    it('does not render the "inlineControl" when prop is undefined', () => {
      expect(render().find(StyledInlineControl).exists()).toBeFalsy();
    });

    it('renders the "inlineControl" with expected styling when prop has value', () => {
      const wrapper = render({ inlineControl });

      assertStyleMatch({
        position: 'absolute',
        top: '24px',
        right: '16px',
        zIndex: '100'
      }, wrapper.find(StyledInlineControl));

      expect(wrapper.find(StyledInlineControl).exists()).toBeTruthy();
    });
  });

  describe('Footer Props', () => {
    const name = 'foo';
    const createdDate = '25/12/20';

    it('does not render the "name" and "createdDate" when either prop is undefined', () => {
      expect(render().find(StyledNoteContent)).toHaveLength(1);
      expect(render({ name }).find(StyledNoteContent)).toHaveLength(1);
      expect(render({ createdDate }).find(StyledNoteContent)).toHaveLength(1);
    });

    it('renders the "name" and "createdDate" when props have value', () => {
      const wrapper = render({ name, createdDate });
      const footerContent = wrapper.find(StyledFooterContent);
      expect(wrapper.find(StyledNoteContent)).toHaveLength(2);
      expect(wrapper.find(StyledFooter).exists()).toBeTruthy();
      expect(footerContent).toHaveLength(2);
      expect(footerContent.at(0).text()).toEqual('foo');
      expect(footerContent.at(1).text()).toEqual('25/12/20');
    });

    it('does not render the "status" when no "text" has no value', () => {
      const wrapper = render({ name, createdDate, status: { timeStamp: '123' } });
      expect(wrapper.find(StyledFooterContent)).toHaveLength(2);
    });

    it('renders the "status" with tooltip when "text" and "timeStamp" have values', () => {
      const wrapper = render({ name, createdDate, status: { text: 'foo', timeStamp: '123' } });
      const status = () => wrapper.find(StatusWithTooltip);
      expect(wrapper.find(StyledFooterContent)).toHaveLength(3);
      expect(status().exists()).toBeTruthy();
      expect(status().text()).toEqual('foo');
      status().simulate('mouseover');
      expect(status().find(Tooltip).exists()).toBeTruthy();
    });

    it('renders the "status" with no tooltip when "text" has value but "timeStamp" has no value', () => {
      const wrapper = render({ name, createdDate, status: { text: 'foo' } });
      const status = () => wrapper.find(StatusWithTooltip);

      status().simulate('mouseover');
      expect(status().find(Tooltip).exists()).toBeFalsy();
      // coverage
      status().simulate('mouseleave');
    });
  });
});
