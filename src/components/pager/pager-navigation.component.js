import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import I18n from 'i18n-js';
import {
  PagerNavigationStyles,
  PagerNavInnerStyles,
  PagerNoSelectStyles,
  PagerButtonWrapperStyles,
  PagerLinkStyles
} from './pager.styles';
import Icon from '../icon';
import NumberComponent from '../../__deprecated__/components/number';
import NumberInput from '../../__experimental__/components/number';
import Events from '../../utils/helpers/events';
import baseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';

const PagerNavigation = (props) => {
  const {
    theme, setCurrentThemeName, setCurrentPage, onPagination
  } = props;

  setCurrentThemeName(theme);

  const updatePageFromInput = (ev) => {
    let newPage = Math.abs(Number(ev.target.value));

    if (Number(newPage) === 0 || Number.isNaN(newPage)) newPage = '1';
    else if (newPage > maxPages()) newPage = String(maxPages());

    onPagination(String(newPage), props.pageSize, 'input');
    setCurrentPage(String(newPage));
  };

  function maxPages() {
    const totalRecordsCount = props.totalRecords >= 0 ? props.totalRecords : 0;

    if (props.pageSize && props.pageSize !== '0' && totalRecordsCount > 0) {
      return Math.ceil(totalRecordsCount / props.pageSize);
    }
    return 1;
  }

  function navArrowChange(step) {
    const newPage = String(Number(props.currentPage) + step);
    const desc = step === 1 ? 'next' : 'previous';
    onPagination(newPage, props.pageSize, desc);
  }

  function navArrow(step) {
    const arrowProps = {
      'data-element': 'next-page',
      type: 'dropdown'
    };

    function disabled() {
      if (maxPages() === 1) {
        return true;
      }
      if (step === -1) {
        return props.currentPage === '1';
      }
      return props.currentPage === String(maxPages());
    }

    return (
      <PagerButtonWrapperStyles disabled={ disabled() } next={ step === 1 }>
        <Icon
          onClick={ () => {
            if (!disabled()) { navArrowChange(step); }
          } }
          { ...arrowProps }
        />
      </PagerButtonWrapperStyles>
    );
  }

  function navLink(type) {
    const currentPage = Number(props.currentPage);
    const navLinkConfig = {
      first: {
        text: I18n.t('pager.first', { defaultValue: 'First' }),
        destination: '1'
      },
      last: {
        text: I18n.t('pager.last', { defaultValue: 'Last' }),
        destination: String(maxPages())
      },
      next: {
        text: I18n.t('pager.next', { defaultValue: 'Next' }),
        destination: String(currentPage + 1)
      },
      back: {
        text: I18n.t('pager.previous', { defaultValue: 'Previous' }),
        destination: String(currentPage - 1)
      }
    };

    const { destination, text } = navLinkConfig[type];

    const clickHandler = () => {
      onPagination(destination, props.pageSize, type);
    };

    function disabled() {
      if (maxPages() === 1) {
        return true;
      }
      if (currentPage === 1) {
        return type === 'back' || type === 'first';
      }
      if (currentPage === maxPages()) {
        return type === 'next' || type === 'last';
      }
      return false;
    }

    return (
      <PagerLinkStyles
        disabled={ disabled() }
        onClick={ !disabled() ? clickHandler : undefined }
      >
        { text }
      </PagerLinkStyles>
    );
  }

  function handlePageInputChange(ev) {
    setCurrentPage(ev.target.value);
  }

  function currentPageInput() {
    const currentPageInputProps = {
      value: props.currentPage,
      className: 'carbon-pager__current-page',
      'data-element': 'current-page',
      onChange: handlePageInputChange,
      onBlur: updatePageFromInput,
      onKeyUp: (ev) => {
        if (!Events.isEnterKey(ev)) {
          return false;
        }
        return updatePageFromInput(ev);
      }
    };

    if (isClassic(theme)) {
      return (
        <label>
          <NumberComponent { ...currentPageInputProps } />
        </label>
      );
    }
    return (
      <label>
        <NumberInput { ...currentPageInputProps } />
      </label>
    );
  }

  if (isClassic(theme)) {
    return (
      <PagerNavigationStyles>
        { navArrow(-1) }
        <PagerNoSelectStyles>
          { I18n.t('pager.page_x', { defaultValue: 'Page ' }) }
        </PagerNoSelectStyles>
        { currentPageInput() }
        <PagerNoSelectStyles>
          { I18n.t('pager.of_y', { defaultValue: ' of ' }) }{ maxPages() }
        </PagerNoSelectStyles>
        { navArrow(1) }
      </PagerNavigationStyles>
    );
  }
  return (
    <PagerNavigationStyles>
      { navLink('first') }
      { navLink('back') }
      <PagerNavInnerStyles>
        <PagerNoSelectStyles>
          { I18n.t('pager.page_x', { defaultValue: 'Page ' }) }
        </PagerNoSelectStyles>
        { currentPageInput() }
        <PagerNoSelectStyles>
          { I18n.t('pager.of_y', { defaultValue: ' of ' }) }{ maxPages() }
        </PagerNoSelectStyles>
      </PagerNavInnerStyles>
      { navLink('next') }
      { navLink('last') }
    </PagerNavigationStyles>
  );
};

PagerNavigation.propTypes = {
  /** Current visible page */
  currentPage: PropTypes.string.isRequired,
  /** Total number of records */
  totalRecords: PropTypes.number.isRequired,
  /** Pagination page size */
  pageSize: PropTypes.string,
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: PropTypes.func.isRequired,
  /** Sets the current page being shown */
  setCurrentPage: PropTypes.func,
  /** Current theme */
  theme: PropTypes.object,
  /** Callback for the current theme name */
  setCurrentThemeName: PropTypes.func
};

PagerNavigation.defaultProps = {
  theme: baseTheme
};

export default withTheme(PagerNavigation);
