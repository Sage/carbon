import React from 'react';

import Link from 'components/link';
import Pod from 'components/pod';
import TextBox from 'components/textbox';

import Submenu from 'components/submenu';

const components = [
   { name: 'One' },
   { name: 'Two' }
];
const patterns = [
   { name: 'One' },
   { name: 'Two' }
];

class Homepage extends React.Component {
  /**
   * @method render
   */
  get componentsHTML() {
    return components.map((item, i) => {
      return <Link key={ i } href='#' name={ item.name }>{ item.name }</Link>;
    });
  }
  get patternsHTML() {
    return patterns.map((item, i) => {
      return <Link key={ i } href='#' name={ item.name }>{ item.name }</Link>;
    });
  }

  render() {
    return (
      <Submenu
        className='home-menu'
        toggleable={ false }
        initiallyOpen={ true }
      >
        <Link>Getting Started</Link>
        <Submenu title='Components' filter={ true }>
          { this.componentsHTML }
        </Submenu>
        <Submenu title='Patterns' filter={ false }>
          { this.patternsHTML }
        </Submenu>
        <Link>Style</Link>
        <Link>Articles</Link>
      </Submenu>
    );
  }
}

export default Homepage;
