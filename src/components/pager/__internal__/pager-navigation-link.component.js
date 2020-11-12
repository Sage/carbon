import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import { StyledPagerLinkStyles } from "./pager.style";

const PagerNavigationLink = ({
  type,
  currentPage,
  pageCount,
  pageSize,
  onClick,
  onPagination,
  ...props
}) => {
  const linkRef = useRef();
  const navLinkConfig = {
    first: {
      text: I18n.t("pager.first", { defaultValue: "First" }),
      destination: "1",
    },
    last: {
      text: I18n.t("pager.last", { defaultValue: "Last" }),
      destination: pageCount,
    },
    next: {
      text: I18n.t("pager.next", { defaultValue: "Next" }),
      destination: currentPage + 1,
    },
    previous: {
      text: I18n.t("pager.previous", { defaultValue: "Previous" }),
      destination: currentPage - 1,
    },
  };

  const disabled = useCallback(() => {
    if (pageCount === 1 || pageCount === 0) {
      return true;
    }

    if (currentPage === 1) {
      return type === "previous" || type === "first";
    }

    if (currentPage === pageCount) {
      return type === "next" || type === "last";
    }

    return false;
  }, [pageCount, currentPage, type]);

  useEffect(() => {
    if (disabled() && linkRef.current) {
      linkRef.current.blur();
    }
  }, [disabled]);

  const handleOnCLick = (e) => {
    onClick(e);
    onPagination(navLinkConfig[type].destination, pageSize, type);
  };

  const { text } = navLinkConfig[type];

  return (
    <StyledPagerLinkStyles
      data-element={`pager-link-${type}`}
      disabled={disabled()}
      onClick={handleOnCLick}
      ref={linkRef}
      {...props}
    >
      {text}
    </StyledPagerLinkStyles>
  );
};

PagerNavigationLink.propTypes = {
  /** Type of Pagination link to be allowed for navigation */
  type: PropTypes.oneOf(["next", "previous", "first", "last"]).isRequired,
  /** Current visible page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /** Count of all the pages  */
  pageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /** Pagination page size */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  /** onClick Callback function */
  onClick: PropTypes.func,
  /** onPagination Callback to process pagination  */
  onPagination: PropTypes.func,
};

export default PagerNavigationLink;
