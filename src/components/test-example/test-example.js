import React from 'react';

import Button from 'components/button';
import Content from 'components/content';
import Heading from 'components/heading';
import Link from 'components/link';

const TestExample = (props) =>
  <div>
    { showButtons(props) }
    <Heading divider={ true } title={ props.heading } />
    <Link href={ props.url } />

    <Content title={ contentTitle(props) }>{ increment(props) }</Content>
    <Content title={ contentTitle(props) }>{ increment(props) }</Content>
    <Content title={ contentTitle(props) }>{ increment(props) }</Content>
  </div>
;

const contentTitle = (props) => {
  return props.showButtons ? 'Counter' : 'Counter (no buttons)';
};

const increment = (props) => {
  let counted = parseInt(props.startCount) + 1;
  return counted;
};

const showButtons = (props) => {
  if (props.showButtons) {
    return (
      <div>
        <Button as='primary'>Click me</Button>
        <Button as='secondary' theme='grey'>Go back</Button>
      </div>
    );
  }
};


export default TestExample;
