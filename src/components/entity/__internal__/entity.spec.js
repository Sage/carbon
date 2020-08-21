import React from 'react';
import { mount, shallow } from 'enzyme';

import Entity from './entity.component';
import EntityHeader from './entity-header.component';
import EntityContent from './entity-content.component';
import EntityContentDivider from './entity-content-divider.component';
import {
  StyledEntityHeaderContainer, StyledEntityHeader, StyledEntityContentDivider
} from './entity.style';

import { MenuButton } from '../../action-popover/action-popover.style';
import StyledIcon from '../../icon/icon.style';

import { baseTheme } from '../../../style/themes';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

describe('Entity', () => {
  it('Entity renders properly ordered header and content', () => {
    const wrapper = shallow(
      <Entity
        header={ <div className='header' /> }
        content={ <div className='content' /> }
      />
    );
    expect(wrapper.childAt(0).hasClass('header')).toBe(true);
    expect(wrapper.childAt(1).hasClass('content')).toBe(true);
  });

  it('EntityHeader renders properly ordered title, adornments and menu', () => {
    const wrapper = shallow(
      <EntityHeader
        title='title'
        adornments={ <div className='adornments' /> }
        menu={ <div className='menu' /> }
      />
    );
    expect(wrapper.childAt(0).contains('title')).toBe(true);
    expect(wrapper.childAt(1).hasClass('adornments')).toBe(true);
    expect(wrapper.childAt(2).hasClass('menu')).toBe(true);
  });

  it('EntityHeader overwrites menu button styles', () => {
    const wrapper = mount(
      <EntityHeader
        title='title'
        adornments={ <div className='adornments' /> }
        menu={ <div className='menu' /> }
      />
    );

    assertStyleMatch({
      margin: '0',
      marginLeft: 'auto'
    }, wrapper.find(StyledEntityHeaderContainer),
    { modifier: `${MenuButton}` });

    assertStyleMatch({
      color: baseTheme.entity.menuButton
    }, wrapper.find(StyledEntityHeaderContainer),
    { modifier: `${MenuButton} > ${StyledIcon}` });
  });

  it('EntityContent renders children', () => {
    const wrapper = shallow(
      <EntityContent><div className='children' /></EntityContent>
    );
    expect(wrapper.childAt(0).hasClass('children')).toBe(true);
  });

  it('EntityHeader renders title with proper font-size', () => {
    const wrapper = mount(<EntityHeader title='Title' />);

    assertStyleMatch({
      fontSize: '16px'
    }, wrapper.find(StyledEntityHeader));

    wrapper.setProps({ fontSize: 14 });

    assertStyleMatch({
      fontSize: '14px'
    }, wrapper.find(StyledEntityHeader));
  });

  it('EntityContentDivider renders with proper margin-left and margin-right values', () => {
    const wrapper = mount(<EntityContentDivider />);

    assertStyleMatch({
      marginLeft: '16px',
      marginRight: '16px'
    }, wrapper.find(StyledEntityContentDivider));

    wrapper.setProps({ mr: 4, ml: 4 });

    assertStyleMatch({
      marginLeft: '32px',
      marginRight: '32px'
    }, wrapper.find(StyledEntityContentDivider));
  });
});
