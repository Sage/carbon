import React from 'react';
import { Route } from 'react-router';

export default obj => {
  return generateRoutesFor(obj);
}

const generateRoutesFor = (obj) => {
  let arr = [];

  for (let key in obj) {
    let value = obj[key];

    if (value.component) {
      arr.push(
        <Route key={ key } path={ key } component={ value.component } />
      );
    } else if (value.items) {
      arr.push(
        <Route key={ key } path={ key }>
          { generateRoutesFor(value.items) }
        </Route>
      );
    }
  }

  return arr;
}
