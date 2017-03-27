import Button from 'components/button';
import Content from 'components/content';
import Heading from 'components/heading';
import Link from 'components/link';

export default [
  {
    component: Button,
    instances: [ {
      expectedInstances: 1,
      props: { as: 'primary',   children: 'Click me', theme: 'blue' }
    }, {
      expectedInstances: 1,
      props: { as: 'secondary', children: 'Go back',  theme: 'grey' }
    } ]
  }, {
    component: Heading,
    instances: [ {
      expectedInstances: 1,
      props: { divider: true, title: 'Test' }
    } ]
  }, {
    component: Link,
    instances: [ {
      expectedInstances: 1,
      props: { href: 'http://test.com' }
    } ]
  }, {
    component: Content,
    instances: [ {
      expectedInstances: 3,
      props: { title: 'Counter', children: 11 }
    } ]
  }
];
