import React from 'react';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import Link from 'carbon-react/lib/components/link';

const Index = ({ route: { routes } }) => (
  <AppWrapper>
    <h1>Carbon Fixture Testbed</h1>
    <p>This application is used to test various carbon controls. It is intended to be used during automation.</p>

    <h2>Uncontrolled Inputs</h2>
    <ol>
      {Object.keys(routes).reduce(((acc, key) => {
        if (routes[key].uncontrolled) {
          const to = `/uncontrolled/${key}`;
          acc.push(<li key={ to }><Link to={ to }>{routes[key].description}</Link></li>);
        }
        return acc;
      }), [])}
    </ol>
    <h2>Controlled Inputs</h2>
    <ol>
      {Object.keys(routes).reduce(((acc, key) => {
        if (routes[key].controlled) {
          const to = `/controlled/${key}`;
          acc.push(<li key={ to }><Link to={ to }>{routes[key].description}</Link></li>);
        }
        return acc;
      }), [])}
    </ol>
  </AppWrapper>
);

export default Index;
