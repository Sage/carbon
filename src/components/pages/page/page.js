import React from 'react';
import FullScreenHeading from './../../dialog-full-screen/full-screen-heading';

class Page extends React.Component {
  render() {
    return (
      <div className="carbon-page">
        <FullScreenHeading>
          { this.props.title }
        </FullScreenHeading>

        <div className="carbon-page__content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Page;
