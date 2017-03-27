import Content from 'components/content';
import Heading from 'components/heading';
import Link from 'components/link';

export default [
  {
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
      props: { title: 'Counter (no buttons)', children: 11 }
    } ]
  }
];
