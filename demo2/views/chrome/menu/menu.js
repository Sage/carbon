import React from 'react';

// Flux
import DemoActions from '../../../actions/demo';

// Carbon
import Link from 'components/link';
import { Sidebar, SidebarHeader } from 'components/sidebar';
import { MenuListItem, MenuList } from 'components/menu-list';

// Demo Site
import GetCodeButtons from '../../components/get-code-buttons';

const components = [
  { name: 'Alert',                type: 'modal'        },
  { name: 'Animated Menu Button', type: 'action'       },
  { name: 'App Wrapper',          type: 'layout'       },
  { name: 'Button Toggle',        type: 'action'       },
  { name: 'Button',               type: 'action'       },
  { name: 'Carousel',             type: 'layout'       },
  { name: 'Checkbox',             type: 'form'         },
  { name: 'Confirm',              type: 'modal'        },
  { name: 'Content',              type: 'layout'       },
  { name: 'Create',               type: 'action'       },
  { name: 'Date',                 type: 'form'         },
  { name: 'Decimal',              type: 'form'         },
  { name: 'Detail',               type: 'layout'       },
  { name: 'Dialog Full Screen',   type: 'modal'        },
  { name: 'Dialog',               type: 'modal'        },
  { name: 'Dropdown Filter Ajax', type: 'form'         },
  { name: 'Dropdown Filter',      type: 'form'         },
  { name: 'Dropdown',             type: 'form'         },
  { name: 'Fieldset',             type: 'form'         },
  { name: 'Filter',               type: 'form'         },
  { name: 'Flash',                type: 'notification' },
  { name: 'Form',                 type: 'form'         },
  { name: 'Heading',              type: 'layout'       },
  { name: 'Help',                 type: 'misc'         },
  { name: 'I18n',                 type: 'misc'         },
  { name: 'Icon',                 type: 'misc'         },
  { name: 'Link',                 type: 'action'       },
  { name: 'Menu',                 type: 'action'       },
  { name: 'Message',              type: 'notification' },
  { name: 'Multi Action Button',  type: 'action'       },
  { name: 'Multi Step Wizard',    type: 'action'       },
  { name: 'Navigation Bar',       type: 'layout'       },
  { name: 'Number',               type: 'form'         },
  { name: 'Pill',                 type: 'misc'         },
  { name: 'Pod',                  type: 'layout'       },
  { name: 'Portrait',             type: 'misc'         },
  { name: 'Profile',              type: 'misc'         },
  { name: 'Radio Button',         type: 'form'         },
  { name: 'Rainbow',              type: 'chart'        },
  { name: 'Row',                  type: 'layout'       },
  { name: 'Show Edit Pod',        type: 'layout'       },
  { name: 'Sidebar',              type: 'modal'        },
  { name: 'Spinner',              type: 'misc'         },
  { name: 'Split Button',         type: 'action'       },
  { name: 'Table Ajax',           type: 'grid'         },
  { name: 'Table',                type: 'grid'         },
  { name: 'Tabs',                 type: 'layout'       },
  { name: 'Textarea',             type: 'form'         },
  { name: 'Textbox',              type: 'form'         },
  { name: 'Toast',                type: 'notification' },
  { name: 'Tooltip',              type: 'misc'         },
  { name: 'Validations',          type: 'form'         }
];
const styles = [
   { name: 'Colours' },
   { name: 'Text' }
];

class Menu extends React.Component {
  /**
   * @method render
   */
  get componentsHTML() {
    return components.map((item, i) => {
      return <MenuListItem key={ i } name={ item.name }><Link>{ item.name }</Link></MenuListItem>;
    });
  }
  get stylesHTML() {
    return styles.map((item, i) => {
      return <MenuListItem key={ i } name={ item.name }><Link>{ item.name }</Link></MenuListItem>;
    });
  }

  render() {
    return (
      <Sidebar
        className="demo-menu"
        enableBackgroundUI={ !this.props.isTablet }
        onCancel={ this.props.isTablet ? DemoActions.toggleMenu : null }
        open={ this.props.menuOpen || !this.props.isTablet }
        position="left"
        size='small'
      >
        <SidebarHeader className='demo-menu__header' />

        <MenuList
          className='demo-menu__menu'
          toggleable={ false }
          initiallyOpen={ true }
        >
          <MenuListItem><Link>Getting Started</Link></MenuListItem>
          <MenuListItem>
            <MenuList title='Components' filter={ true }>
              { this.componentsHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem><Link>Patterns</Link></MenuListItem>
          <MenuListItem>
            <MenuList title='Style' filter={ true }>
              { this.stylesHTML }
            </MenuList>
          </MenuListItem>
          <MenuListItem><Link>Articles</Link></MenuListItem>
        </MenuList>

        <div className='demo-menu__buttons'>
          { GetCodeButtons.github() }
          { GetCodeButtons.download('grey') }
        </div>

      </Sidebar>
    );
  }
}

export default Menu;
