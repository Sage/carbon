import AnimatedMenuButton from './';
import OptionsHelper from '../../utils/helpers/options-helper';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('animated-menu-button', AnimatedMenuButton, {
  hiddenProps: ["children"],
  propOptions: {
    direction: OptionsHelper.alignBinary,
    size: OptionsHelper.sizesFull
  },
  propTypes: {
    className: 'String',
    children: 'Node',
    direction: 'String',
    label: 'String',
    size: 'String'
  },
  propDescriptions: {
    className: 'Classes to apply to the component.',
    children: 'This component supports children.',
    direction: 'The direction in which the component should expand.',
    label: 'An optional title for the component.',
    size: 'The size in which the component should expand to.'
  },
  propValues: {
    children: `<Row>
    <div>
      <h2>1st Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </div>

    <div>
      <h2>2nd Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </div>

    <div>
      <h2>3rd Category</h2>
      <p><Link>First Option</Link></p>
      <p><Link>Another Option</Link></p>
    </div>
  </Row>`
  }
});

export default definition;
