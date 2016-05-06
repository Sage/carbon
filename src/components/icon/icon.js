import React from 'react';
import classNames from 'classnames';
import TooltipDecorator from './../../utils/decorators/tooltip-decorator';

/**
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * For information on how to use the Tooltip Decorator see the decorator docs.
 *
 * @class Icon
 * @constructor
 */
const Icon = TooltipDecorator(class Icon extends React.Component {

  /**
   * Checks if we have an SVG available, otherwise will fall back
   * to using the icon font.
   *
   * @method renderIcon
   * @return {HTML}
   */
  get renderIcon() {
    let icon;

    switch(this.type) {
      case 'warning':
        icon = this.renderWarningIcon;
        break;
      case 'new':
        icon = this.renderNewIcon;
        break;
      case 'maintenance':
        icon = this.renderMaintenanceIcon;
        break;
      case 'sort-up':
        icon = this.renderSortUpIcon;
        break;
      case 'sort-down':
        icon = this.renderSortDownIcon;
        break;
      case 'bin':
        icon = this.renderBinIcon;
        break;
      case 'basket':
        icon = this.renderBasketIcon;
        break;
      default:
        null;
        break;
    }

    return icon;
  }

  /**
   * Return component props
   *
   * @method componentProps
   * @return {Object} props
   */
  get componentProps() {
    let { className, ...props } = this.props;

    props.type = this.type;

    return props;
  }

  /**
   * Return component classes
   *
   * @method mainClasses
   * @return {String} classes
   */
  get mainClasses() {
    let icon = this.renderIcon;

    let classes = classNames(
      'ui-icon',
      this.props.className, {
        [`icon-${this.type}`]: !icon
      }
    );
    return classes;
  }

  /**
   * Return Icon type with overrides
   *
   * @method type
   * @return {String} icon type
   */
  get type() {
    // we have no icon for 'success', so use 'tick'
    return this.props.type == 'success' ? 'tick' : this.props.type;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <span
        className={ this.mainClasses }
        { ...this.componentProps }
        dangerouslySetInnerHTML={ this.renderIcon }
        ref={ (comp) => this._target = comp }>
        { this.tooltipHTML }
      </span>
    );
  }

  /**
   * Returns the 'warning' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderWarningIcon
   * @return {Object} warningIcon svg
   */
  get renderWarningIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--warning" width="25px" height="20px" viewBox="0 0 50 40" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                '<g class="ui-icon__svg-group" fill="currentColor">' +
                    '<path d="M23.4139163,5.53773397 C24.2898861,4.1361822 25.7118106,4.13889694 26.5860837,5.53773397 L43.4139163,32.462266 C44.2898861,33.8638178 43.6576906,35 41.9934988,35 L8.0065012,35 C6.34605644,35 5.71181059,33.8611031 6.58608373,32.462266 L23.4139163,5.53773397 Z M23,12 L27,12 L27,24 L23,24 L23,12 Z M25,32 C26.6568542,32 28,30.6568542 28,29 C28,27.3431458 26.6568542,26 25,26 C23.3431458,26 22,27.3431458 22,29 C22,30.6568542 23.3431458,32 25,32 Z"></path>' +
                '</g>' +
            '</g>' +
        '</svg>'
    };
  }

  get renderSortDownIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--sort-down" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' +
          '<title>sort-down</title>' +
            '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' +
              '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' +
                '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">' +
                  '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' +
                    '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-down"></path>' +
                  '</g>' +
                '</g>' +
              '</g>' +
            '</g>' +
        '</svg>'
    };
  }

  get renderSortUpIcon() {
    return {
      __html:
      '<svg class="ui-icon__svg ui-icon__svg--sort-up" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' +
        '<title>sort-up</title>' +
          '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' +
            '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' +
              '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">'+
                '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' +
                  '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-up" transform="translate(427.000000, 20.500000) scale(1, -1) translate(-427.000000, -20.500000) "></path>' +
                '</g>' +
              '</g>' +
            '</g>'+
          '</g>' +
      '</svg>'
    };
  }

  /**
   * Returns the 'new' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderNewIcon
   * @return {Object} newIcon svg
   */
  get renderNewIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--new" width="50px" height="40px" viewBox="0 0 50 40">' +
        '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
          '<g class="ui-icon__svg-group" fill="currentColor">' +
            '<path d="M12,20 L21,20 L21,33 L12,33 L12,20 Z M29,20 L38,20 L38,33 L29,33 L29,20 Z M22,12 L28,12 L28,33 L22,33 L22,12 Z M11,12 L21,12 L21,19 L11,19 L11,12 Z M29,12 L39,12 L39,19 L29,19 L29,12 Z M23,8 L27,8 L27,11 L23,11 L23,8 Z M14,5 C16.1114562,4.20820393 22,8 22,8 L22,11 L14,11 C14,11 11.8885438,5.79179607 14,5 Z M36.061575,5 C33.9501189,4.20820393 28.061575,8 28.061575,8 L28.061575,11 L36.061575,11 C36.061575,11 38.1730312,5.79179607 36.061575,5 Z" id="Icon-path">' +
          '</path>' +
        '</g>' +
      '</g>' +
    '</svg>'
    };
  }

  /**
   * Returns the 'info' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderMaintenanceIcon
   * @return {Object} infoIcon svg
   */
  get renderMaintenanceIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--maintenance" "width="50px" height="40px" viewBox="0 0 50 40">' +
          '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
            '<g class="ui-icon__svg-group" fill="currentColor">' +
              '<path d="M35.2343942,10.801511 C34.4036528,9.97082285 34.4036528,8.61548951 35.2343942,7.78480133 L37.1582163,5.86110239 C37.3768325,5.64250024 37.2456628,5.29273679 36.9396002,5.20529593 C35.0595013,4.68065077 32.917063,5.1615755 31.4304732,6.64807014 C29.8127137,8.26572606 29.4192046,10.5829089 30.1187763,12.5503282 C30.1624995,12.6814895 30.1624995,12.8563713 30.0313298,12.9875325 L18.0074416,25.0106509 C17.876272,25.1418122 17.7451023,25.1418122 17.5702094,25.0980918 C15.5589408,24.3548445 13.2416096,24.7920488 11.6675733,26.4097047 C10.1372603,27.9399198 9.70002798,30.0385004 10.2247067,31.9621994 C10.3121532,32.2682424 10.7056623,32.3556832 10.9242784,32.1370811 L12.8481005,30.2133821 C13.6788419,29.382694 15.034262,29.382694 15.8650034,30.2133821 C16.6957448,31.0440703 16.6957448,32.3994037 15.8650034,33.2300918 L13.9411813,35.1537908 C13.7225651,35.3723929 13.8100116,35.7658768 14.1160742,35.8533177 C15.9961731,36.3779628 18.1386113,35.9407585 19.6252012,34.4105435 C21.2429607,32.7928875 21.6364697,30.4757047 20.936898,28.5082853 C20.8931748,28.3771241 20.8931748,28.2022423 21.0243445,28.071081 L33.0919559,16.0042422 C33.2231256,15.873081 33.3542953,15.873081 33.5291882,15.9168014 C35.5404568,16.6600487 37.857788,16.2228444 39.4318243,14.6051885 C40.9184141,13.1186938 41.3993696,10.9763927 40.8746908,9.09641424 C40.7872444,8.79037123 40.3937353,8.70293037 40.1751192,8.92153252 L38.2075738,10.801511 C37.3768325,11.6759196 36.0651356,11.6759196 35.2343942,10.801511 Z M20.936898,19.633038 L24.6533726,15.9168014 C24.8719887,15.6981992 24.8719887,15.3047154 24.6533726,15.0861132 L15.5589408,5.99226368 C14.3784136,4.81181206 12.2796985,4.68065077 11.0117249,5.86110239 C9.70002798,7.08527444 9.65630475,9.1838551 10.9242784,10.4517476 L20.1061567,19.633038 C20.3247728,19.8516401 20.7182819,19.8516401 20.936898,19.633038 Z M39.4755475,31.8310381 C39.388101,31.7435972 39.3006546,31.6561563 39.2132081,31.6124359 L37.5954486,30.7817477 C37.5517254,30.7380273 37.4642789,30.6943069 37.4205557,30.6505864 L29.5503743,22.780909 C29.3317582,22.5623068 28.9382491,22.5623068 28.719633,22.780909 L27.7577219,23.7427584 C27.5391058,23.9613606 27.5391058,24.3548445 27.7577219,24.5734466 L35.6279033,32.4431241 C35.6716265,32.4868445 35.7153497,32.5742854 35.759073,32.6180058 L36.5898143,34.2356617 C36.6335376,34.3231026 36.720984,34.4105435 36.8084305,34.4979843 L38.9508687,35.9407585 C39.2132081,36.1156402 39.6067172,36.0719198 39.8253333,35.8533177 L40.7872444,34.8914682 C41.0058605,34.672866 41.0495838,34.2793822 40.8746908,34.0170596 L39.4755475,31.8310381 Z" id="Icon-path">' +
              '</path>' +
           '</g>' +
          '</g>' +
        '</svg>'
    };
  }

  /**
   * Returns the 'bin' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderBinIcon
   * @return {Object} binIcon svg
   */
  get renderBinIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--bin" width="16px" height="16px" viewBox="0 0 16 16">' +
          '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<g fill="currentColor">' +
                  '<path d="M2.17748666,5.97617662 C2.07946348,5.43704916 2.44483697,5 2.9955775,5 L12.0044225,5 C12.5542648,5 12.9191206,5.44483697 12.8225133,5.97617662 L11.1774867,15.0238234 C11.0794635,15.5629508 10.5621186,16 9.99707067,16 L5.00292933,16 C4.44902676,16 3.91912055,15.555163 3.82251334,15.0238234 L2.17748666,5.97617662 Z M1,3 C1,2.44771525 1.44748943,2 1.99850233,2 L13.0014977,2 C13.5529553,2 14,2.44386482 14,3 C14,3.55228475 13.5525106,4 13.0014977,4 L1.99850233,4 C1.44704472,4 1,3.55613518 1,3 Z"></path>' +
              '</g>' +
          '</g>' +
        '</svg>'
    };
  }

  /**
   * Returns the 'basket' icon
   * TODO: Waiting on release of https://github.com/facebook/react/pull/5714
   *
   * @method renderBasketIcon
   * @return {Object} basketIcon svg
   */
  get renderBasketIcon() {
    return {
      __html:
        '<svg class="ui-icon__svg ui-icon__svg--basket" width="16px" height="16px" viewBox="0 0 16 16">' +
          '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
              '<g fill="currentColor">' +
                  '<g>' +
                      '<path d="M0.337342083,6.94077572 C0.151033195,6.42119964 0.444630861,6 1.00087166,6 L14.9991283,6 C15.5518945,6 15.8532955,6.4296875 15.6787991,6.94077572 L12.9069874,15.0592243 C12.729593,15.5788004 12.139475,16 11.5882418,16 L4.58333108,16 C4.03240239,16 3.43170968,15.5703125 3.24844436,15.0592243 L0.337342083,6.94077572 Z"></path>' +
                      '<path d="M11.2490328,9.98677324 L13.3894251,7.19607664 C13.7305431,6.75131854 13.6812982,6.0812921 13.2881596,5.68815351 L8.71184039,1.11183429 C8.32258606,0.722579956 7.6812982,0.718695695 7.28815961,1.11183429 L2.71184039,5.68815351 C2.32258606,6.07740784 2.27628578,6.74998266 2.61710155,7.18171568 L7.4694029,13.3284345 C7.56110619,13.4446008 7.6681764,13.5290423 7.78226818,13.5817768 L4.21712756,7.84506121 C3.92708311,7.37834679 4.00177955,6.66917891 4.37457806,6.27111536 L7.31737756,3.12887854 C7.69437952,2.72632667 8.30939903,2.72345739 8.68749905,3.11874485 L11.7124949,6.28124905 C12.0921901,6.67820424 12.2392384,7.41716468 12.0433089,7.92560655 L11.2490328,9.98677324 Z"></path>' +
                  '</g>' +
              '</g>' +
          '</g>' +
        '</svg>'
    };
  }
});

export default Icon;
