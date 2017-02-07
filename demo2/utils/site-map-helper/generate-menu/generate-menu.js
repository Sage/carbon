import React from 'react';
import SiteMap from './../../../site-map';
import Link from 'components/link';
import { MenuListItem, MenuList } from 'components/menu-list';
import { humanize, titleize } from 'underscore.string';

export default () => {
  return generateMenu();
}

const createMenuLink = (name, url, active) => {
  let classes = active ? "demo-menu__link--active" : null;
  return (
    <MenuListItem key={ name } name={ name }>
      <Link to={ url } className={ classes }>
        { titleize(humanize(name.replace("/", ""))) }
      </Link>
    </MenuListItem>
  );
}

const createSubmenu = (url, value) => {
  let submenuItems = [],
      initiallyOpen = false;

  for (let index in value.items) {
    let name, link;

    if (url.indexOf(":name") > -1) {
      name = value.items[index];
      link = url.replace(":name", name);
    } else {
      name = index;
      link = url + "/" + name;
    }

    let active = (window.location.pathname === link);
    submenuItems.push(createMenuLink(name, link, active));
  }

  let title = url.replace(/\//g, '');
  title = titleize(humanize(title.replace(':name', '')));

  if (url.split("/")[1] === window.location.pathname.split("/")[1]) {
    initiallyOpen = true;
  }

  return (
    <MenuListItem>
      <MenuList title={ title } initiallyOpen={ initiallyOpen } filter={ value.filter } filterPlaceholder="Filter Components">
        { submenuItems }
      </MenuList>
    </MenuListItem>
  );
}

const generateMenu = () => {
  let menu = [];

  for (let key in SiteMap.config) {
    let url = key,
        value = SiteMap.config[key],
        menuItems = [];

    if (value.items) {
      menuItems.push(createSubmenu(url, value));
    } else if (value.component) {
      menuItems.push(createMenuLink(url, url));
    }

    menu.push(menuItems);
  }

  return menu;
}
