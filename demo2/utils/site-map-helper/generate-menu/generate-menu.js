import React from 'react';
import SiteMap from './../../../site-map';
import Link from 'components/link';
import { MenuListItem, MenuList } from 'components/menu-list';
import { titleize } from 'underscore.string';

export default () => {
  return generateMenu();
}

const createMenuLink = (name, url) => {
  return (
    <MenuListItem key={ name } name={ name }>
      <Link to={ url }>
        { titleize(name.replace("-", " ").replace(/\//g, '')) }
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

    submenuItems.push(createMenuLink(name, link));
  }

  let title = url.replace(/\//g, '');
  title = titleize(title.replace(':name', ''));

  if (url.split("/")[1] === window.location.pathname.split("/")[1]) {
    initiallyOpen = true;
  }

  return (
    <MenuListItem>
      <MenuList title={ title } initiallyOpen={ initiallyOpen } filter={ value.filter }>
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
