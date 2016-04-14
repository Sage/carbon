import React from 'react';
import Pod from 'components/pod';
import Icon from 'components/icon';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Pod className="ui-homepage">
        Carbon

        <Icon toolTipMessage='I am a tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip ui-icon__tooltip' type='question'/>
      </Pod>
    );
  }
}

export default Homepage;
