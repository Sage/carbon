import React from 'react';
import Link from 'components/link';
import { MenuListItem, MenuList } from 'components/menu-list';
import { humanize, titleize } from 'underscore.string';
import { startsWith } from 'lodash';
import SiteMap from '../../../site-map';
import './generate-menu.scss';

const humanName = (key) => {
  return titleize(humanize(key.replace('/', '')));
};

const createMenuLink = (name, url, active, external, isMainLink) => {
  const classes = [];

  if (active) classes.push('demo-menu__link--active');
  if (isMainLink) classes.push('demo-menu__link');

  const linkProp = external ? { href: url, target: '_blank' } : { to: url };

  return (
    <MenuListItem key={ name } name={ humanName(name) }>
      <Link className={ classes } { ...linkProp }>
        { humanName(name) }
      </Link>
    </MenuListItem>
  );
};

const createSubmenu = (url, value) => {
  const submenuItems = [];
  let initiallyOpen = false;

  for (const index in value.items) {
    let name, link = value.items[index], external = false;

    if (typeof link === 'string' && startsWith(link, 'http')) {
      name = index;
      external = true;
    } else if (url.indexOf(':name') > -1) {
      name = value.items[index];
      link = url.replace(':name', name);
    } else {
      name = index;
      link = `${url}/${name}`;
    }

    const active = (window.location.pathname === link);
    submenuItems.push(createMenuLink(name, link, active, external));
  }

  let title = url.replace(/\//g, '');
  title = titleize(humanize(title.replace(':name', '')));

  if (url.split('/')[1] === window.location.pathname.split('/')[1]) {
    initiallyOpen = true;
  }

  return (
    <MenuListItem key={ title }>
      <MenuList
        title={ title }
        initiallyOpen={ initiallyOpen }
        filter={ value.filter }
        filterPlaceholder='Filter Components'
      >
        { submenuItems }
      </MenuList>
    </MenuListItem>
  );
};

const generateMenu = () => {
  const menu = [];

  for (const key in SiteMap.config) {
    const url = key,
        value = SiteMap.config[key],
        menuItems = [];

    if (value.items) {
      menuItems.push(createSubmenu(url, value));
    } else if (value.component) {
      menuItems.push(createMenuLink(url, url));
    }

    menu.push(menuItems);
  }

  menu.push(createStorybookLink());

  return menu;
};

const createStorybookLink = () => {
  const classes = ['demo-menu__link'];
  const linkProp = { href: '/storybook' };
  const name = 'Component Library';

  return (
    <MenuListItem key={ name } name={ humanName(name) }>
      <Link className={ classes } { ...linkProp }>
        { humanName(name) }
      </Link>
    </MenuListItem>
  );
};

export default () => {
  return generateMenu();
};
