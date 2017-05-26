import React from 'react';

import Button from 'components/button';
import Content from 'components/content';
import Heading from 'components/heading';
import Link from 'components/link';

const TestExample = (props) =>
  <div>
    <Button as='primary'>Click me</Button>
    <Button as='primary'>Click me</Button>
    <Button as='secondary' theme='grey'>Go back</Button>
    <Heading divider={ true } title={ props.heading } />
    <Link href={ props.url } />

    <Content title='Counters'>{ increment(props) }</Content>
    <Content title='Counter'>{ increment(props) }</Content>
    <Content title='Counter'>{ increment(props) }</Content>
  </div>
;

const increment = (props) => {
  let counted = parseInt(props.startCount) + 1;
  return counted;
};


export default TestExample;
