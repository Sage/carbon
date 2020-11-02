import React, { useRef } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import {
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerNoSelect,
} from "./pager.style";
import NumberInput from "../../../__experimental__/components/number";
import Events from "../../../utils/helpers/events";
import createGuid from "../../../utils/helpers/guid";
import PagerNavigationLink from "./pager-navigation-link.component";
import Label from "../../../__experimental__/components/label";

const PagerNavigation = ({
  pageSize,
  currentPage,
  setCurrentPage,
  onNext,
  onPrevious,
  onFirst,
  onLast,
  onPagination,
  pageCount,
  ...props
}) => {
  const guid = useRef(createGuid());
  const currentPageId = `Pager_${guid.current}`;

  const handlePageInputChange = (ev) => {
    if (Number(ev.target.value) <= 0 || Number.isNaN(Number(ev.target.value))) {
      setCurrentPage(1);
      onPagination(1, pageSize, "input");
      return "1";
    }

    if (Number(ev.target.value) > pageCount) {
      setCurrentPage(pageCount);
      onPagination(pageCount, pageSize, "input");
      return pageCount;
    }

    setCurrentPage(Number(ev.target.value));
    onPagination(Number(ev.target.value), pageSize, "input");
    return ev.target.value;
  };

  const handleCurrentPageChange = (e) => {
    setCurrentPage(e.target.value);
  };

  const pagerNavigationLinkProps = {
    currentPage,
    pageSize,
    pageCount,
    onPagination,
  };

  return (
    <StyledPagerNavigation {...props}>
      <PagerNavigationLink
        type="first"
        onClick={onFirst}
        {...pagerNavigationLinkProps}
      />
      <PagerNavigationLink
        type="previous"
        onClick={onPrevious}
        {...pagerNavigationLinkProps}
      />
      <StyledPagerNavInner>
        <StyledPagerNoSelect>
          {I18n.t("pager.page_x", { defaultValue: "Page " })}
        </StyledPagerNoSelect>
        <Label htmlFor={currentPageId}>
          <NumberInput
            value={currentPage.toString()}
            data-element="current-page"
            onChange={handleCurrentPageChange}
            onBlur={handlePageInputChange}
            id={currentPageId}
            onKeyUp={(ev) => {
              if (!Events.isEnterKey(ev)) {
                return false;
              }
              return handlePageInputChange(ev);
            }}
          />
        </Label>
        <StyledPagerNoSelect>
          {I18n.t("pager.of_y", { defaultValue: " of " })}
          {pageCount}
        </StyledPagerNoSelect>
      </StyledPagerNavInner>
      <PagerNavigationLink
        type="next"
        onClick={onNext}
        {...pagerNavigationLinkProps}
      />
      <PagerNavigationLink
        type="last"
        onClick={onLast}
        {...pagerNavigationLinkProps}
      />
    </StyledPagerNavigation>
  );
};

PagerNavigation.propTypes = {
  /** Current visible page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /** Pagination page size */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /* Count of all of the pages */
  pageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Sets the current page being shown */
  setCurrentPage: PropTypes.func,
  /** onFirst Callback trigered when first link is triggered */
  onFirst: PropTypes.func,
  /** onPrevious Callback trigered when previous link is triggered */
  onPrevious: PropTypes.func,
  /** onNext Callback trigered when next link is triggered */
  onNext: PropTypes.func,
  /** onLast Callback trigered when last link is triggered */
  onLast: PropTypes.func,
  /** onPagination Callback trigered when a change is triggered */
  onPagination: PropTypes.func,
};

export default PagerNavigation;
