import React from 'react';
import Button from './../button';

class Notification extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className='ui-notification'>

        <div className='ui-notification__icon'>
          icon goes here
        </div>

        <div className='ui-notification__info'>
          <div className='ui-notification__title'>
            Just to let you know...
          </div>
          <div className='ui-notification__message'>
            To bring you some exciting new features, we'll be doing some maintenance on Wednesday night from 23:00 EST - sorry you won't be able to use Sage One then.
          </div>
        </div>

        <div className='ui-notification__action'>
          <Button className='ui-notification__action__button'>Got it!</Button> 
        </div>

      </div>
    );
  }
}

export default Notification;
