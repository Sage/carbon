import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Languages
import './i18n/en';

import Components from './views/chrome/menu/component-list';

// Demo
import Chrome from './views/chrome';
import Home from './views/pages/home';
import Colors from './views/pages/colors';
import Icons from './views/pages/icons';

// Components
import AlertWrapper               from './views/pages/component-page/wrappers/alert-wrapper.js';
import AnimatedMenuButtonWrapper  from './views/pages/component-page/wrappers/animated-menu-button-wrapper.js';
import AppWrapperWrapper          from './views/pages/component-page/wrappers/app-wrapper-wrapper.js';
import ButtonToggleWrapperWrapper from './views/pages/component-page/wrappers/button-toggle-wrapper.js';
import ButtonWrapperWrapper       from './views/pages/component-page/wrappers/button-wrapper.js';
import CarouselWrapperWrapper     from './views/pages/component-page/wrappers/carousel-wrapper.js';
import CheckboxWrapperWrapper     from './views/pages/component-page/wrappers/checkbox-wrapper.js';
import ConfirmWrapperWrapper      from './views/pages/component-page/wrappers/confirm-wrapper.js';
import ContentWrapperWrapper      from './views/pages/component-page/wrappers/content-wrapper.js';
import CreateWrapperWrapper       from './views/pages/component-page/wrappers/create-wrapper.js';
import DateComponentWrapper       from './views/pages/component-page/wrappers/date-wrapper.js';
import DecimalWrapper             from './views/pages/component-page/wrappers/decimal-wrapper.js';
import DetailWrapper              from './views/pages/component-page/wrappers/detail-wrapper.js';
import DialogFullScreenWrapper    from './views/pages/component-page/wrappers/dialog-full-screen-wrapper.js';
import DialogWrapper              from './views/pages/component-page/wrappers/dialog-wrapper.js';
import DropdownFilterAjaxWrapper  from './views/pages/component-page/wrappers/dropdown-filter-ajax-wrapper.js';
import DropdownFilterWrapper      from './views/pages/component-page/wrappers/dropdown-filter-wrapper.js';
import DropdownWrapper            from './views/pages/component-page/wrappers/dropdown-wrapper.js';
import FieldsetWrapper            from './views/pages/component-page/wrappers/fieldset-wrapper.js';
import FilterWrapper              from './views/pages/component-page/wrappers/filter-wrapper.js';
import FlashWrapper               from './views/pages/component-page/wrappers/flash-wrapper.js';
import FormWrapper                from './views/pages/component-page/wrappers/form-wrapper.js';
import HeadingWrapper             from './views/pages/component-page/wrappers/heading-wrapper.js';
import HelpWrapper                from './views/pages/component-page/wrappers/help-wrapper.js';
import I18nWrapper                from './views/pages/component-page/wrappers/i18n-wrapper.js';
import IconWrapper                from './views/pages/component-page/wrappers/icon-wrapper.js';
import LinkWrapper                from './views/pages/component-page/wrappers/link-wrapper.js';
import MenuWrapper                from './views/pages/component-page/wrappers/menu-wrapper.js';
import MessageWrapper             from './views/pages/component-page/wrappers/message-wrapper.js';
import MultiActionButtonWrapper   from './views/pages/component-page/wrappers/multi-action-button-wrapper.js';
import MultiStepWizardWrapper     from './views/pages/component-page/wrappers/multi-step-wizard-wrapper.js';
import NavigationBarWrapper       from './views/pages/component-page/wrappers/navigation-bar-wrapper.js';
import NumberComponentWrapper     from './views/pages/component-page/wrappers/number-wrapper.js';
import PillWrapper                from './views/pages/component-page/wrappers/pill-wrapper.js';
import PodWrapper                 from './views/pages/component-page/wrappers/pod-wrapper.js';
import PortraitWrapper            from './views/pages/component-page/wrappers/portrait-wrapper.js';
import ProfileWrapper             from './views/pages/component-page/wrappers/profile-wrapper.js';
import RadioButtonWrapper         from './views/pages/component-page/wrappers/radio-button-wrapper.js';
import RainbowWrapper             from './views/pages/component-page/wrappers/rainbow-wrapper.js';
import RowWrapper                 from './views/pages/component-page/wrappers/row-wrapper.js';
import ShowEditPodWrapper         from './views/pages/component-page/wrappers/show-edit-pod-wrapper.js';
import SidebarWrapper             from './views/pages/component-page/wrappers/sidebar-wrapper.js';
import SpinnerWrapper             from './views/pages/component-page/wrappers/spinner-wrapper.js';
import SplitButtonWrapper         from './views/pages/component-page/wrappers/split-button-wrapper.js';
import TableAjaxWrapper           from './views/pages/component-page/wrappers/table-ajax-wrapper.js';
import TableWrapper               from './views/pages/component-page/wrappers/table-wrapper.js';
import TabsWrapper                from './views/pages/component-page/wrappers/tabs-wrapper.js';
import TextareaWrapper            from './views/pages/component-page/wrappers/textarea-wrapper.js';
import TextboxWrapper             from './views/pages/component-page/wrappers/textbox-wrapper.js';
import ToastWrapper               from './views/pages/component-page/wrappers/toast-wrapper.js';
import TooltipWrapper             from './views/pages/component-page/wrappers/tooltip-wrapper.js';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />
    <Route path="/colors" component={ Colors } />
    <Route path="/icons" component={ Icons } />
    <Route path="/components/alert"                component={ AlertWrapper } />
    <Route path="/components/animated-menu-button" component={ AnimatedMenuButtonWrapper } />
    <Route path="/components/app-wrapper"          component={ AppWrapperWrapper } />
    <Route path="/components/button-toggle"        component={ ButtonToggleWrapper } />
    <Route path="/components/button"               component={ ButtonWrapper } />
    <Route path="/components/carousel"             component={ CarouselWrapper } />
    <Route path="/components/checkbox"             component={ CheckboxWrapper } />
    <Route path="/components/confirm"              component={ ConfirmWrapper } />
    <Route path="/components/content"              component={ ContentWrapper } />
    <Route path="/components/create"               component={ CreateWrapper } />
    <Route path="/components/date"                 component={ DateComponentWrapper } />
    <Route path="/components/decimal"              component={ DecimalWrapper } />
    <Route path="/components/detail"               component={ DetailWrapper } />
    <Route path="/components/dialog-full-screen"   component={ DialogFullScreenWrapper } />
    <Route path="/components/dialog"               component={ DialogWrapper } />
    <Route path="/components/dropdown-filter-ajax" component={ DropdownFilterAjaxWrapper } />
    <Route path="/components/dropdown-filter"      component={ DropdownFilterWrapper } />
    <Route path="/components/dropdown"             component={ DropdownWrapper } />
    <Route path="/components/fieldset"             component={ FieldsetWrapper } />
    <Route path="/components/filter"               component={ FilterWrapper } />
    <Route path="/components/flash"                component={ FlashWrapper } />
    <Route path="/components/form"                 component={ FormWrapper } />
    <Route path="/components/heading"              component={ HeadingWrapper } />
    <Route path="/components/help"                 component={ HelpWrapper } />
    <Route path="/components/i18n"                 component={ I18nWrapper } />
    <Route path="/components/icon"                 component={ IconWrapper } />
    <Route path="/components/link"                 component={ LinkWrapper } />
    <Route path="/components/menu"                 component={ MenuWrapper } />
    <Route path="/components/message"              component={ MessageWrapper } />
    <Route path="/components/multi-action-button"  component={ MultiActionButtonWrapper } />
    <Route path="/components/multi-step-wizard"    component={ MultiStepWizardWrapper } />
    <Route path="/components/navigation-bar"       component={ NavigationBarWrapper } />
    <Route path="/components/number"               component={ NumberComponentWrapper } />
    <Route path="/components/pill"                 component={ PillWrapper } />
    <Route path="/components/pod"                  component={ PodWrapper } />
    <Route path="/components/portrait"             component={ PortraitWrapper } />
    <Route path="/components/profile"              component={ ProfileWrapper } />
    <Route path="/components/radio-button"         component={ RadioButtonWrapper } />
    <Route path="/components/rainbow"              component={ RainbowWrapper } />
    <Route path="/components/row"                  component={ RowWrapper } />
    <Route path="/components/show-edit-pod"        component={ ShowEditPodWrapper } />
    <Route path="/components/sidebar"              component={ SidebarWrapper } />
    <Route path="/components/spinner"              component={ SpinnerWrapper } />
    <Route path="/components/split-button"         component={ SplitButtonWrapper } />
    <Route path="/components/table-ajax"           component={ TableAjaxWrapper } />
    <Route path="/components/table"                component={ TableWrapper } />
    <Route path="/components/tabs"                 component={ TabsWrapper } />
    <Route path="/components/textarea"             component={ TextareaWrapper } />
    <Route path="/components/textbox"              component={ TextboxWrapper } />
    <Route path="/components/toast"                component={ ToastWrapper } />
    <Route path="/components/tooltip"              component={ TooltipWrapper } />
  </Route>
);

startRouter(routes);
