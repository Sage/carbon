import React from 'react';
import TableDemo from './table-demo';
import TableAjaxDemo from './table-ajax-demo';
import TableFormDemo from './table-form-demo';

class Grids extends React.Component {
  /**
   * @method render
   */
  // render() {
  //   return (
  //     <div>
  //       <h1>Grids</h1>
  //       <TableDemo />
  //       <TableAjaxDemo />
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        <h1>Grids</h1>
        <TableFormDemo />
      </div>
    );
  }
}

export default Grids;
