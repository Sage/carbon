import Definitions from './definitions';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';
import Textbox from 'components/textbox';
import SiteMapHelper from './utils/site-map-helper';

export default new SiteMapHelper({
  "/getting-started": {
    component: Textbox
  },
  "/style": {
    items: {
      colors: {
        component: Colors
      },
      icons: {
        component: Icons
      }
    }
  },
  "/components/:name": {
    component: Component,
    items: Object.keys(Definitions),
    filter: true
  }
});
