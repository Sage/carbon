'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDecoratorsTooltipDecorator = require('./../../utils/decorators/tooltip-decorator');

var _utilsDecoratorsTooltipDecorator2 = _interopRequireDefault(_utilsDecoratorsTooltipDecorator);

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
var Icon = (0, _utilsDecoratorsTooltipDecorator2['default'])((function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    _get(Object.getPrototypeOf(Icon.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Icon, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        'span',
        _extends({
          className: this.mainClasses
        }, this.componentProps, {
          dangerouslySetInnerHTML: this.renderIcon,
          ref: function (comp) {
            return _this._target = comp;
          } }),
        this.tooltipHTML
      );
    }

    /**
     * Returns the 'warning' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderWarningIcon
     * @return {Object} warningIcon svg
     */
  }, {
    key: 'renderIcon',

    /**
     * Checks if we have an SVG available, otherwise will fall back
     * to using the icon font.
     *
     * @method renderIcon
     * @return {HTML}
     */
    get: function get() {
      switch (this.type) {
        case 'warning':
          return this.renderWarningIcon;
        case 'new':
          return this.renderNewIcon;
        case 'maintenance':
          return this.renderMaintenanceIcon;
        case 'sort-up':
          return this.renderSortUpIcon;
        case 'sort-down':
          return this.renderSortDownIcon;
        case 'refresh':
          return this.renderRefreshIcon;
        case 'bin':
          return this.renderBinIcon;
        case 'basket':
          return this.renderBasketIcon;
        case 'phone':
          return this.renderPhoneIcon;
        case 'mobile':
          return this.renderMobileIcon;
        case 'location':
          return this.renderLocationIcon;
        case 'email':
          return this.renderEmailIcon;
        case 'business':
          return this.renderBusinessIcon;
        case 'individual':
          return this.renderIndividualIcon;
        default:
          null;
      }
    }

    /**
     * Return component props
     *
     * @method componentProps
     * @return {Object} props
     */
  }, {
    key: 'componentProps',
    get: function get() {
      var _props = this.props;
      var className = _props.className;

      var props = _objectWithoutProperties(_props, ['className']);

      props.type = this.type;

      return props;
    }

    /**
     * Return component classes
     *
     * @method mainClasses
     * @return {String} classes
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      var icon = this.renderIcon;

      var classes = (0, _classnames2['default'])('ui-icon', this.props.className, _defineProperty({}, 'icon-' + this.type, !icon));
      return classes;
    }

    /**
     * Return Icon type with overrides
     *
     * @method type
     * @return {String} icon type
     */
  }, {
    key: 'type',
    get: function get() {
      // we have no icon for 'success', so use 'tick'
      return this.props.type == 'success' ? 'tick' : this.props.type;
    }
  }, {
    key: 'renderWarningIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--warning" width="25px" height="20px" viewBox="0 0 50 40" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M23.4139163,5.53773397 C24.2898861,4.1361822 25.7118106,4.13889694 26.5860837,5.53773397 L43.4139163,32.462266 C44.2898861,33.8638178 43.6576906,35 41.9934988,35 L8.0065012,35 C6.34605644,35 5.71181059,33.8611031 6.58608373,32.462266 L23.4139163,5.53773397 Z M23,12 L27,12 L27,24 L23,24 L23,12 Z M25,32 C26.6568542,32 28,30.6568542 28,29 C28,27.3431458 26.6568542,26 25,26 C23.3431458,26 22,27.3431458 22,29 C22,30.6568542 23.3431458,32 25,32 Z"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }
  }, {
    key: 'renderSortDownIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--sort-down" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<title>sort-down</title>' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' + '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">' + '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' + '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-down"></path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }
  }, {
    key: 'renderSortUpIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--sort-up" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<title>sort-up</title>' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' + '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">' + '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' + '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-up" transform="translate(427.000000, 20.500000) scale(1, -1) translate(-427.000000, -20.500000) "></path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'new' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderNewIcon
     * @return {Object} newIcon svg
     */
  }, {
    key: 'renderNewIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--new" width="50px" height="40px" viewBox="0 0 50 40">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M12,20 L21,20 L21,33 L12,33 L12,20 Z M29,20 L38,20 L38,33 L29,33 L29,20 Z M22,12 L28,12 L28,33 L22,33 L22,12 Z M11,12 L21,12 L21,19 L11,19 L11,12 Z M29,12 L39,12 L39,19 L29,19 L29,12 Z M23,8 L27,8 L27,11 L23,11 L23,8 Z M14,5 C16.1114562,4.20820393 22,8 22,8 L22,11 L14,11 C14,11 11.8885438,5.79179607 14,5 Z M36.061575,5 C33.9501189,4.20820393 28.061575,8 28.061575,8 L28.061575,11 L36.061575,11 C36.061575,11 38.1730312,5.79179607 36.061575,5 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'info' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderMaintenanceIcon
     * @return {Object} infoIcon svg
     */
  }, {
    key: 'renderMaintenanceIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--maintenance" width="50px" height="40px" viewBox="0 0 50 40">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M35.2343942,10.801511 C34.4036528,9.97082285 34.4036528,8.61548951 35.2343942,7.78480133 L37.1582163,5.86110239 C37.3768325,5.64250024 37.2456628,5.29273679 36.9396002,5.20529593 C35.0595013,4.68065077 32.917063,5.1615755 31.4304732,6.64807014 C29.8127137,8.26572606 29.4192046,10.5829089 30.1187763,12.5503282 C30.1624995,12.6814895 30.1624995,12.8563713 30.0313298,12.9875325 L18.0074416,25.0106509 C17.876272,25.1418122 17.7451023,25.1418122 17.5702094,25.0980918 C15.5589408,24.3548445 13.2416096,24.7920488 11.6675733,26.4097047 C10.1372603,27.9399198 9.70002798,30.0385004 10.2247067,31.9621994 C10.3121532,32.2682424 10.7056623,32.3556832 10.9242784,32.1370811 L12.8481005,30.2133821 C13.6788419,29.382694 15.034262,29.382694 15.8650034,30.2133821 C16.6957448,31.0440703 16.6957448,32.3994037 15.8650034,33.2300918 L13.9411813,35.1537908 C13.7225651,35.3723929 13.8100116,35.7658768 14.1160742,35.8533177 C15.9961731,36.3779628 18.1386113,35.9407585 19.6252012,34.4105435 C21.2429607,32.7928875 21.6364697,30.4757047 20.936898,28.5082853 C20.8931748,28.3771241 20.8931748,28.2022423 21.0243445,28.071081 L33.0919559,16.0042422 C33.2231256,15.873081 33.3542953,15.873081 33.5291882,15.9168014 C35.5404568,16.6600487 37.857788,16.2228444 39.4318243,14.6051885 C40.9184141,13.1186938 41.3993696,10.9763927 40.8746908,9.09641424 C40.7872444,8.79037123 40.3937353,8.70293037 40.1751192,8.92153252 L38.2075738,10.801511 C37.3768325,11.6759196 36.0651356,11.6759196 35.2343942,10.801511 Z M20.936898,19.633038 L24.6533726,15.9168014 C24.8719887,15.6981992 24.8719887,15.3047154 24.6533726,15.0861132 L15.5589408,5.99226368 C14.3784136,4.81181206 12.2796985,4.68065077 11.0117249,5.86110239 C9.70002798,7.08527444 9.65630475,9.1838551 10.9242784,10.4517476 L20.1061567,19.633038 C20.3247728,19.8516401 20.7182819,19.8516401 20.936898,19.633038 Z M39.4755475,31.8310381 C39.388101,31.7435972 39.3006546,31.6561563 39.2132081,31.6124359 L37.5954486,30.7817477 C37.5517254,30.7380273 37.4642789,30.6943069 37.4205557,30.6505864 L29.5503743,22.780909 C29.3317582,22.5623068 28.9382491,22.5623068 28.719633,22.780909 L27.7577219,23.7427584 C27.5391058,23.9613606 27.5391058,24.3548445 27.7577219,24.5734466 L35.6279033,32.4431241 C35.6716265,32.4868445 35.7153497,32.5742854 35.759073,32.6180058 L36.5898143,34.2356617 C36.6335376,34.3231026 36.720984,34.4105435 36.8084305,34.4979843 L38.9508687,35.9407585 C39.2132081,36.1156402 39.6067172,36.0719198 39.8253333,35.8533177 L40.7872444,34.8914682 C41.0058605,34.672866 41.0495838,34.2793822 40.8746908,34.0170596 L39.4755475,31.8310381 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'info' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderRefreshIcon
     * @return {Object} refreshIcon svg
     */
  }, {
    key: 'renderRefreshIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--refresh" width="13px" height="16px" viewBox="0 0 13 16">' + '<g class="ui-icon__svg-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="Clients-to-Invite---highlight-state" transform="translate(-1029.000000, -227.000000)" fill="currentColor">' + '<g id="Tags" transform="translate(505.000000, 227.000000)">' + '<g id="resend-invitation" transform="translate(524.000000, 0.000000)">' + '<path d="M7.00097862,2.70098912 C10.3528746,2.9650394 12.9924827,5.8368169 12.9924827,9.34059286 C12.9924827,13.0184819 10.0840164,16 6.49624136,16 C2.90846633,16 0,13.0184819 0,9.34059286 C0,8.86925873 0.0477666277,8.40936132 0.138608168,7.96571016 L1.99884343,7.96571016 C1.99884343,7.96571016 1.9988435,8.68664161 1.9988435,9.34059286 C1.9988435,11.8868237 4.01239711,13.9509517 6.49624136,13.9509517 C8.98008562,13.9509517 10.9936392,11.8868237 10.9936392,9.34059286 C10.9936392,6.96927971 9.24723222,5.01610685 7.00097862,4.75894453 L7.00097862,8 L2.00097862,3.5 L7.00097862,1.77635684e-14 L7.00097862,2.70098912 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'bin' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderBinIcon
     * @return {Object} binIcon svg
     */
  }, {
    key: 'renderBinIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--bin" width="16px" height="16px" viewBox="0 0 16 16">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g fill="currentColor">' + '<path d="M2.17748666,5.97617662 C2.07946348,5.43704916 2.44483697,5 2.9955775,5 L12.0044225,5 C12.5542648,5 12.9191206,5.44483697 12.8225133,5.97617662 L11.1774867,15.0238234 C11.0794635,15.5629508 10.5621186,16 9.99707067,16 L5.00292933,16 C4.44902676,16 3.91912055,15.555163 3.82251334,15.0238234 L2.17748666,5.97617662 Z M1,3 C1,2.44771525 1.44748943,2 1.99850233,2 L13.0014977,2 C13.5529553,2 14,2.44386482 14,3 C14,3.55228475 13.5525106,4 13.0014977,4 L1.99850233,4 C1.44704472,4 1,3.55613518 1,3 Z"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'basket' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderBasketIcon
     * @return {Object} basketIcon svg
     */
  }, {
    key: 'renderBasketIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--basket" width="16px" height="16px" viewBox="0 0 16 16">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g fill="currentColor">' + '<g>' + '<path d="M0.337342083,6.94077572 C0.151033195,6.42119964 0.444630861,6 1.00087166,6 L14.9991283,6 C15.5518945,6 15.8532955,6.4296875 15.6787991,6.94077572 L12.9069874,15.0592243 C12.729593,15.5788004 12.139475,16 11.5882418,16 L4.58333108,16 C4.03240239,16 3.43170968,15.5703125 3.24844436,15.0592243 L0.337342083,6.94077572 Z"></path>' + '<path d="M11.2490328,9.98677324 L13.3894251,7.19607664 C13.7305431,6.75131854 13.6812982,6.0812921 13.2881596,5.68815351 L8.71184039,1.11183429 C8.32258606,0.722579956 7.6812982,0.718695695 7.28815961,1.11183429 L2.71184039,5.68815351 C2.32258606,6.07740784 2.27628578,6.74998266 2.61710155,7.18171568 L7.4694029,13.3284345 C7.56110619,13.4446008 7.6681764,13.5290423 7.78226818,13.5817768 L4.21712756,7.84506121 C3.92708311,7.37834679 4.00177955,6.66917891 4.37457806,6.27111536 L7.31737756,3.12887854 C7.69437952,2.72632667 8.30939903,2.72345739 8.68749905,3.11874485 L11.7124949,6.28124905 C12.0921901,6.67820424 12.2392384,7.41716468 12.0433089,7.92560655 L11.2490328,9.98677324 Z"></path>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'phone' icon
     *
     * @method renderPhoneIcon
     * @return {Object} phoneIcon svg
     */
  }, {
    key: 'renderPhoneIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--phone" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="Phone" fill="currentColor">' + '<path d="M12.0107283,0.0107283407 C11.6773752,-0.0263820644 11.4921892,0.0476923486 11.0107283,0.0107283407 L9.01072834,5.01072834 C9.15884514,4.69586176 11.0107283,7.01072834 11.0107283,7.01072834 C10.3255171,8.84402889 8.84402889,10.3440357 7.01072834,11.0107283 L5.01072834,9.01072834 C4.84401059,9.19588235 0.0107283407,11.0107283 0.0107283407,11.0107283 C0.0476923486,11.4921892 -0.0263820644,11.6773752 0.0107283407,12.0107283 L2.01072834,16.0107283 C9.30699397,15.0847982 15.0847982,9.32551257 16.0107283,2.01072834 C15.9551725,1.71436664 12.0107283,0.0107283407 12.0107283,0.0107283407 Z" id="phone"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'mobile' icon
     *
     * @method renderMobileIcon
     * @return {Object} MobileIcon svg
     */
  }, {
    key: 'renderMobileIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--mobile" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="Mobile" fill="currentColor">' + '<path d="M2,1.00087166 C2,0.448105505 2.45576096,0 3.00247329,0 L12.9975267,0 C13.5511774,0 14,0.444630861 14,1.00087166 L14,14.9991283 C14,15.5518945 13.544239,16 12.9975267,16 L3.00247329,16 C2.44882258,16 2,15.5553691 2,14.9991283 L2,1.00087166 Z M4,2 L12,2 L12,12 L4,12 L4,2 Z M7,13 L9,13 L9,15 L7,15 L7,13 Z" id="mobile"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'location' icon
     *
     * @method renderLocationIcon
     * @return {Object} LocationIcon svg
     */
  }, {
    key: 'renderLocationIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--location" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="Location" fill="currentColor">' + '<path d="M9,7.87134308 C9.34393668,7.66881234 9.6231266,7.36501414 9.79822502,7 L10,7 L10,5 L9.67829779,5 C9.50642746,4.7307295 9.27371764,4.50540953 9,4.34422802 L9,4 L7,4 L7,4.34422802 C6.72628236,4.50540953 6.49357254,4.7307295 6.32170221,5 L6,5 L6,7 L6.20177498,7 C6.3768734,7.36501414 6.65606332,7.66881234 7,7.87134308 L7,8 L7.2604644,8 C7.4892256,8.09272873 7.73876374,8.14371406 8,8.14371406 C8.26123626,8.14371406 8.5107744,8.09272873 8.7395356,8 L9,8 L9,7.87134308 Z M13.6875603,8.05824939 C13.8901806,7.44575465 14,6.78982533 14,6.10778555 C14,2.73454873 11.3137085,0 8,0 C4.6862915,0 2,2.73454873 2,6.10778555 C2,6.80321636 2.11417403,7.47150135 2.32448148,8.09427582 C2.30622232,8.10455399 2.29833976,8.1145496 2.30151367,8.12420477 C3.26623535,11.0589291 7.99531064,15.5 7.99531064,15.5 C7.99531064,15.5 12.6048587,11.1498898 13.6818852,8.12420477 C13.6900203,8.10135074 13.6918167,8.07937373 13.6875603,8.05824939 Z" id="location"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'email' icon
     *
     * @method renderEmailIcon
     * @return {Object} Email Icon svg
     */
  }, {
    key: 'renderEmailIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--email" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="email" fill="currentColor">' + '<path d="M16,4.40248228 L16,3.00247329 C16,2.45576096 15.5518945,2 14.9991283,2 L1.00087166,2 C0.444630861,2 0,2.44882258 0,3.00247329 L0,4.40206403 L8.00452271,9 L16,4.40248228 Z M16,6.40227305 L16,12.9975267 C16,13.5511774 15.5553691,14 14.9991283,14 L1.00087166,14 C0.448105505,14 0,13.544239 0,12.9975267 L0,6.40227305 L8,11 L16,6.40227305 Z"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'business' icon
     *
     * @method renderBusinessIcon
     * @return {Object} Business Icon svg
     */
  }, {
    key: 'renderBusinessIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--business" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="business" fill="currentColor">' + '<path fill="currentColor" fill-rule="evenodd" d="M7 16h7.993155C15.550051 16 16 15.553384 16 15.0024554V7H2v8.0024554C2 15.5536886 2.45078 16 3.006845 16H5v-6h2v6zm2-6h4v3H9v-3zM5.399994 0h7.200012L18 6H0l5.399994-6z"/>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'individual' icon
     *
     * @method renderIndividualIcon
     * @return {Object} Individual Icon svg
     */
  }, {
    key: 'renderIndividualIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--individual" width="16px" height="16px" viewBox="0 0 16 16">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="individual" fill="currentColor">' + '<path fill="currentColor" fill-rule="evenodd" d="M15.98642 11.2560819c.006876-.0499498.011419-.1002324.01358-.1508295C15.917431 9.401891 12.143433 8 8 8S.023747 9.401891 0 11.2603787c.001017.0761355.008515.1517135.022283.2266423l-.010409 1.64102C.00527 14.1691032.835758 15 1.866717 15h12.266566C15.162298 15 16 14.1618954 16 13.128041v-1.8719591h-.01358zM8 6c1.656854 0 3-1.3431458 3-3S9.656854 0 8 0 5 1.3431458 5 3s1.343146 3 3 3z"/>' + '</g>' + '</g>' + '</svg>'
      };
    }
  }]);

  return Icon;
})(_react2['default'].Component));

exports['default'] = Icon;
module.exports = exports['default'];