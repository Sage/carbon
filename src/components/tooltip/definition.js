import Tooltip from './';
import Definition from './../../../demo/utils/definition';
import OptionsHelper from '../../utils/helpers/options-helper';
import { uniq } from 'lodash';

let definition = new Definition('tooltip', Tooltip, {
  type: 'miscellaneous',
  propValues: {
    isVisible: true,
    children: "I'm a helpful tooltip that can display more information to a user."
  },
  propOptions: {
    align: uniq(OptionsHelper.positions.concat(OptionsHelper.alignFull)),
    position: OptionsHelper.positions
  },
  propTypes: {
    align: 'String',
    children: 'Node',
    position: 'String',
    isVisible: 'Boolean'
  },
  propDescriptions: {
    align: 'The alignment of the pointer on the tooltip.',
    children: 'Child content to render in the tooltip.',
    isVisible: 'Whether to show or hide the tooltip. Use this with a handler to hide and show the tooltip',
    position: 'The position of the tooltip relative to its target element.'
  }
});

export default definition;
