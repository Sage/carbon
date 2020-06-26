import React from 'react';
import { Example } from './example.component';

export default {
  title: 'Design System/Example/Test',
  component: Example,
  parameters: {
    info: {
      disable: true
    },
    docs: {
      disable: true
    }
  }
};

export const chromatic = () => (
  <> <p>Story can have any name</p>
    <Example>An example story for chromatic automation</Example>
  </>
);

export const cypress = () => (
  <> <p>Story can have any name</p>
    <Example>An example story for cypress automation</Example>
  </>
);
