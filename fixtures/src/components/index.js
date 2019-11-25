import React from 'react';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import Link from 'carbon-react/lib/components/link';

const Index = ({ route: { routes } }) => (
  <AppWrapper>
    <h1>Carbon Fixture Testbed</h1>
    <p>This application is used to test various Carbon controls. It is intended to be used during automation.</p>

    <h2>Uncontrolled Inputs</h2>
    <ol>
      {Object.keys(routes).filter(key => routes[key].uncontrolled).map((key) => {
        const to = `/uncontrolled/${key}`;
        return (<li key={ to }><Link to={ to }>{routes[key].description}</Link></li>);
      })}
    </ol>
    <h2>Controlled Inputs</h2>
    <ol>
      {Object.keys(routes).filter(key => routes[key].controlled).map((key) => {
        const to = `/controlled/${key}`;
        return (<li key={ to }><Link to={ to }>{routes[key].description}</Link></li>);
      })}
    </ol>
  </AppWrapper>
);

export default Index;
