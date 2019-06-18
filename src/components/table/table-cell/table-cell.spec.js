import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import TableCell from '.';
import { Table, TableRow } from '..';
import StyledTableCell from './table-cell.style';
import StyledInputPresentation from '../../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';
import BaseTheme from '../../../style/themes/base';
import ClassicTheme from '../../../style/themes/classic';
import SmallTheme from '../../../style/themes/small';
import Date from '../../../__experimental__/components/date';
import TextArea from '../../../__experimental__/components/textarea';
import TextBox from '../../../__experimental__/components/textbox';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import tableSizes from '../table-sizes.style.js';

describe('TableCell', () => {
  let wrapper, td;

  beforeEach(() => {
    wrapper = mount(
      <Table>
        <TableRow>
          <TableCell
            className='foo' align='right'
            style={ { width: '50px' } }
          />
        </TableRow>
      </Table>
    );
    td = wrapper.find('td').hostNodes();
  });

  it('renders additional props to the td element', () => {
    expect(td.exists()).toBeTruthy();
    expect(td.prop('style').width).toEqual('50px');
  });

  it('renders a td to match expected style', () => {
    wrapper = mount(
      <Table>
        <TableRow>
          <TableCell
            align='right'
            action
            isLastRow
          />
        </TableRow>
      </Table>
    );
    expect(td.exists()).toBeTruthy();
    assertStyleMatch({
      backgroundColor: BaseTheme.table.primary,
      borderBottom: `1px solid ${BaseTheme.table.secondary}`,
      textAlign: 'right'
    }, td);
  });

  describe('with action', () => {
    beforeEach(() => {
      wrapper = mount(
        <StyledTableCell
          theme={ ClassicTheme }
          action
        />
      );
      td = wrapper.find('td').hostNodes();
    });

    it('renders a td which matches the expected style', () => {
      assertStyleMatch({
        width: '18px',
        textAlign: 'left'
      }, td);

      assertStyleMatch({
        cursor: 'pointer',
        color: BaseTheme.colors.border,
        fontSize: '16px',
        lineHeight: '15px',
        marginLeft: '1px'
      }, td, { modifier: '.icon-delete:before' });
    });
  });

  describe('tags on component', () => {
    const wrapper2 = shallow(<TableCell data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper2, 'table-cell', 'bar', 'baz');
    });
  });

  describe('DLS themed TableCell with inputs', () => {
    describe.each(['compact', 'small', 'medium', 'large'])(
      'when the table size is %s', (size) => {
        it('renders an input that matches the expected style', () => {
          wrapper = mount(
            <ThemeProvider theme={ SmallTheme }>
              <TableCell size={ size }>
                <TextBox />
              </TableCell>
            </ThemeProvider>
          );

          assertStyleMatch({
            minHeight: `${tableSizes[size].inputHeight}px`,
            height: `${tableSizes[size].inputHeight}px`,
            paddingLeft: tableSizes[size].paddingSize,
            paddingRight: tableSizes[size].paddingSize,
            position: 'relative'
          }, wrapper, { modifier: `&& ${StyledInputPresentation}` });

          assertStyleMatch({
            fontSize: tableSizes[size].fontSize,
            height: `${tableSizes[size].inputHeight}px`,
            paddingTop: '0px',
            paddingBottom: '0px'
          }, wrapper,
          { modifier: `&& ${StyledInput}` });
        });

        it('renders a textarea that matches the expected style', () => {
          wrapper = mount(
            <ThemeProvider theme={ SmallTheme }>
              <TableCell size={ size }>
                <TextArea />
              </TableCell>
            </ThemeProvider>
          );

          assertStyleMatch({
            minHeight: `${tableSizes[size].inputHeight}px`,
            height: `${tableSizes[size].inputHeight * 3}px`,
            paddingLeft: tableSizes[size].paddingSize,
            paddingRight: tableSizes[size].paddingSize,
            position: 'relative',
            marginTop: '4px',
            marginBottom: '4px'
          }, wrapper, { modifier: `&& ${StyledInputPresentation}` });

          assertStyleMatch({
            fontSize: tableSizes[size].fontSize,
            overflow: 'auto',
            resize: 'none',
            flexGrow: '1',
            height: 'auto !important',
            paddingTop: '5px',
            paddingBottom: '5px'
          }, wrapper, { modifier: 'textarea' });
        });

        it('renders to match the expected style for multiple textarea inputs', () => {
          wrapper = mount(
            <ThemeProvider theme={ SmallTheme }>
              <TableCell size={ size }>
                <TextArea />
                <Date />
              </TableCell>
            </ThemeProvider>
          );

          assertStyleMatch({
            minHeight: `${tableSizes[size].inputHeight}px`,
            height: `${tableSizes[size].inputHeight * 3}px`,
            paddingLeft: tableSizes[size].paddingSize,
            paddingRight: tableSizes[size].paddingSize,
            position: 'relative',
            marginTop: '4px',
            marginBottom: '4px'
          }, wrapper, { modifier: `&& ${StyledInputPresentation}` });

          assertStyleMatch({
            fontSize: tableSizes[size].fontSize,
            overflow: 'auto',
            resize: 'none',
            flexGrow: '1',
            height: 'auto !important',
            paddingTop: '5px',
            paddingBottom: '5px'
          }, wrapper, { modifier: 'textarea' });
        });

        it('renders a Date input that matches the expected style', () => {
          wrapper = mount(
            <ThemeProvider theme={ SmallTheme }>
              <TableCell size={ size }>
                <Date />
              </TableCell>
            </ThemeProvider>
          );

          assertStyleMatch({
            minHeight: `${tableSizes[size].inputHeight}px`,
            height: `${tableSizes[size].inputHeight}px`,
            paddingLeft: tableSizes[size].paddingSize,
            paddingRight: tableSizes[size].paddingSize,
            position: 'relative',
            width: size === 'large' ? '150px' : undefined
          }, wrapper, { modifier: `&& ${StyledInputPresentation}` });
        });

        it('renders to match the expected style for multiple Date inputs', () => {
          wrapper = mount(
            <ThemeProvider theme={ SmallTheme }>
              <TableCell size={ size }>
                <Date />
                <Date />
              </TableCell>
            </ThemeProvider>
          );

          assertStyleMatch({
            minHeight: `${tableSizes[size].inputHeight}px`,
            height: `${tableSizes[size].inputHeight}px`,
            paddingLeft: tableSizes[size].paddingSize,
            paddingRight: tableSizes[size].paddingSize,
            position: 'relative',
            width: size === 'large' ? '150px' : undefined
          }, wrapper, { modifier: `&& ${StyledInputPresentation}` });
        });
      }
    );
  });
});
