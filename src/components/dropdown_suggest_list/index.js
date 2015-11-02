import React from 'react';
import Request from 'superagent';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';
import InputIcon from './../../utils/input/icon';
import Immutable from 'immutable';

class DropdownSuggestList extends React.Component {

  render() {
    
    if (this.props.options.length) {
      var results = this.props.options.map((option) => {
        var className = "ui-dropdown-suggest__item";

        return <li
                  key={option.name + option.id}
                  value={option.id}
                  onMouseDown={this.props.handleSelect}
                  onMouseOver={this.props.handleMouseOver}
                  className={(this.props.highlighted == option.id) ? className + ' ui-dropdown-suggest__item--highlighted' : className}
                >{option.name}</li>;
      });
    } else {
      var results = <li>No results</li>;
    } 

    var listClasses = "ui-dropdown-suggest__list" + 
        (this.props.open ? '' : ' hidden');

    return (
      <ul
        ref="list"
        className={ listClasses }
        onScroll={ this.props.handleScroll }
      >
        { results }
      </ul>
    )
  }
}

export default DropdownSuggestList

