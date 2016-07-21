import React from 'react';
import Pod from 'components/pod';
import MultiActionButton from 'components/multi-action-button';
import Icon from 'components/icon';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <Pod className="ui-homepage">
        Carbon
        <div>
          <Icon type='information' />
        </div>
        <div>
          <Icon type='sync' />
        </div>
      </Pod>
    );
  }
}

export default Homepage;
