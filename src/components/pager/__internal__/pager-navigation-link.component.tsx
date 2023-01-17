import React, { useRef, useEffect, useCallback } from "react";

import { StyledPagerLink } from "../pager.style";
import useLocale from "../../../hooks/__internal__/useLocale";
import { LinkProps } from "../../../components/link";

interface PagerNavigationLinkProps {
  /** Type of Pagination link to be allowed for navigation */
  type: "next" | "previous" | "first" | "last";
  /** Current visible page */
  currentPage: number;
  /** Count of all the pages  */
  pageCount: number;
  /** Pagination page size */
  pageSize: number;
  /** onClick Callback function */
  onClick?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** onPagination Callback to process pagination  */
  onPagination?: (
    pageSize: number,
    currentPage: number,
    origin: string
  ) => void;
}

const PagerNavigationLink = ({
  type,
  currentPage,
  pageCount,
  pageSize,
  onClick,
  onPagination,
}: PagerNavigationLinkProps) => {
  const l = useLocale();
  const linkRef = useRef<HTMLLinkElement | HTMLButtonElement | null>(null);
  const navLinkConfig = {
    first: {
      text: l.pager.first(),
      destination: 1,
    },
    last: {
      text: l.pager.last(),
      destination: pageCount,
    },
    next: {
      text: l.pager.next(),
      destination: currentPage + 1,
    },
    previous: {
      text: l.pager.previous(),
      destination: currentPage - 1,
    },
  };

  const disabled = useCallback(() => {
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

  const handleOnCLick = (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    onClick?.(ev);
    onPagination?.(navLinkConfig[type].destination, pageSize, type);
  };

  const { text } = navLinkConfig[type];

  return (
    <StyledPagerLink
      data-element={`pager-link-${type}`}
      disabled={disabled()}
      onClick={
        // Type assertion due to the fact that StyledPagerLink
        // will always return a button element
        handleOnCLick as LinkProps["onClick"]
      }
      ref={linkRef}
    >
      {text}
    </StyledPagerLink>
  );
};

export default PagerNavigationLink;
