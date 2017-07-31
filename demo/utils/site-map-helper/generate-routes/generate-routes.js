import React from 'react';
import { Route } from 'react-router';
import Document from './../../../views/pages/document';

export default (obj) => {
  return generateRoutesFor(obj);
};

const generateRoutesFor = (obj) => {
  const arr = [];

  for (const key in obj) {
    const value = obj[key];

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
    } else {
      arr.push(
        <Route key={ key } path={ key } component={ Document } document={ value } />
      );
    }
  }

  return arr;
};
