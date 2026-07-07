import React, { useEffect, useState, useRef } from "react";
import useLocale from "../../../hooks/__internal__/useLocale";

import {
  StyledPaginationNavigation,
  StyledNavigationButtonContainer,
  StyledButtonWrapper,
  StyledCurrentPageContainer,
  StyledInputWrapper,
  StyledCurrentPage,
} from "./pagination-navigation.style";

import Textbox from "../../textbox";
import Button from "../../button/__next__";
import Icon from "../../icon";
import Typography from "../../typography";
import guid from "../../../__internal__/utils/helpers/guid";

type PaginationButtonRef = HTMLButtonElement | HTMLAnchorElement;

/**
 * Renders navigation Buttons and current page input
 */
export interface PaginationNavigationProps {
  /** Current visible page */
  currentPage: number;
  /** Page size, number of elements on the current page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Sets the current page being shown */
  setCurrentPage: (page: number) => void;
  /** Callback function for next link */
  onNext?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for first link */
  onFirst?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for previous link */
  onPrevious?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** Callback function for last link */
  onLast?: (
    ev:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /** onPagination Callback triggered when a change is triggered */
  onPagination: (currentPage: number, pageSize: number, origin: string) => void;
  /** Should the `First` and `Last` navigation buttons be shown */
  showFirstAndLastButtons?: boolean;
  /** If true, page number navigation will be changed to a non-interactive label */
  interactivePageNumber?: boolean;
  /** Size of the button */
  size?: "small" | "medium" | "large";
}

const PaginationNavigation = ({
  currentPage,
  pageSize,
  totalPages,
  setCurrentPage,
  onNext,
  onFirst,
  onPrevious,
  onLast,
  onPagination,
  showFirstAndLastButtons,
  interactivePageNumber,
  size,
}: PaginationNavigationProps) => {
  const locale = useLocale();

  const [currentPageInputValue, setCurrentPageInputValue] = useState<
    string | number
  >(currentPage);
  const previousRef = useRef<PaginationButtonRef>(null);
  const nextRef = useRef<PaginationButtonRef>(null);
  const { current: currentPageDescriptionId } = useRef(guid());

  const showFirst = currentPage > 1 && showFirstAndLastButtons;
  const showPrevious = currentPage > 1;
  const showNext = currentPage < totalPages;
  const showLast = currentPage < totalPages && showFirstAndLastButtons;

  useEffect(() => {
    setCurrentPageInputValue(currentPage);
  }, [currentPage]);

  const buttonFocusRef = useRef<"previous" | "next" | null>(null);

  useEffect(() => {
    if (!buttonFocusRef.current) return;

    switch (buttonFocusRef.current) {
      case "next":
        nextRef.current?.focus();
        break;
      case "previous":
        previousRef.current?.focus();
        break;
    }

    buttonFocusRef.current = null;
  }, [currentPage]);

  const handleFirstButtonClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    buttonFocusRef.current = "next";
    setCurrentPage(1);
    onFirst?.(ev as React.MouseEvent<HTMLButtonElement>);
    onPagination(1, pageSize, "first");
  };

  const handlePreviousButtonClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const page = currentPage - 1;
    if (page === 1) {
      buttonFocusRef.current = "next";
    }

    setCurrentPage(page);
    onPrevious?.(ev as React.MouseEvent<HTMLButtonElement>);
    onPagination(page, pageSize, "previous");
  };

  const handleNextButtonClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const page = currentPage + 1;

    if (page === totalPages) {
      buttonFocusRef.current = "previous";
    }

    setCurrentPage(page);
    onNext?.(ev as React.MouseEvent<HTMLButtonElement>);
    onPagination(page, pageSize, "next");
  };

  const handleLastButtonClick = (
    ev:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    buttonFocusRef.current = "previous";
    setCurrentPage(totalPages);
    onLast?.(ev as React.MouseEvent<HTMLButtonElement>);
    onPagination(totalPages, pageSize, "last");
  };

  const renderNavigationButtons = () => {
    return (
      <StyledNavigationButtonContainer>
        {showFirstAndLastButtons && (
          <StyledButtonWrapper $visible={showFirst}>
            <Button
              variantType="subtle"
              aria-label={locale.pager.firstAriaLabel?.()}
              size={size}
              onClick={handleFirstButtonClick}
            >
              <Icon type="chevron_first_pagination" />
            </Button>
          </StyledButtonWrapper>
        )}
        <StyledButtonWrapper $visible={showPrevious}>
          <Button
            variantType="subtle"
            aria-label={locale.pager.previousAriaLabel?.()}
            size={size}
            onClick={handlePreviousButtonClick}
            ref={previousRef}
          >
            <Icon type="chevron_left_thick" />
          </Button>
        </StyledButtonWrapper>
        <StyledButtonWrapper $visible={showNext}>
          <Button
            variantType="subtle"
            aria-label={locale.pager.nextAriaLabel?.()}
            size={size}
            onClick={handleNextButtonClick}
            ref={nextRef}
          >
            <Icon type="chevron_right_thick" />
          </Button>
        </StyledButtonWrapper>
        {showFirstAndLastButtons && (
          <StyledButtonWrapper $visible={showLast}>
            <Button
              variantType="subtle"
              aria-label={locale.pager.lastAriaLabel?.()}
              size={size}
              onClick={handleLastButtonClick}
            >
              <Icon type="chevron_last_pagination" />
            </Button>
          </StyledButtonWrapper>
        )}
      </StyledNavigationButtonContainer>
    );
  };

  const handleCurrentPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPageInputValue(e.target.value);
  };

  const handleSubmitCurrentPage = () => {
    const parsedPage = Number(currentPageInputValue);

    // reset current page when NaN
    if (!Number.isInteger(parsedPage)) {
      setCurrentPageInputValue(currentPage);
      return;
    }

    // set current page to 1 when lower than 1
    if (parsedPage < 1) {
      setCurrentPageInputValue(1);
      setCurrentPage(1);
      onPagination(1, pageSize, "input");
      return;
    }

    // set current to last page when more than total
    if (parsedPage > totalPages) {
      setCurrentPageInputValue(totalPages);
      setCurrentPage(totalPages);
      onPagination(totalPages, pageSize, "input");
      return;
    }

    setCurrentPage(parsedPage);
    onPagination(parsedPage, pageSize, "input");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitCurrentPage();
    }
  };

  const renderCurrentPage = () => {
    if (interactivePageNumber && totalPages > 1) {
      return (
        <StyledCurrentPageContainer>
          <Typography id={currentPageDescriptionId} screenReaderOnly>
            {`${locale.pager.pageX(currentPage)} ${locale.pager.ofTotalPages?.(totalPages)}`}
          </Typography>
          <StyledInputWrapper
            $size={size || /* istanbul ignore next */ "medium"}
          >
            <Textbox
              aria-label={locale.pager.pageX(currentPage)}
              aria-describedby={currentPageDescriptionId}
              value={currentPageInputValue}
              onChange={handleCurrentPageChange}
              onBlur={handleSubmitCurrentPage}
              onKeyDown={handleKeyDown}
              size={size}
              inputMode="numeric"
            />
          </StyledInputWrapper>
          <div aria-hidden="true">
            {locale.pager.ofTotalPages?.(totalPages)}
          </div>
        </StyledCurrentPageContainer>
      );
    }

    return (
      <StyledCurrentPage>
        {currentPage} {locale.pager.ofTotalPages?.(totalPages)}
      </StyledCurrentPage>
    );
  };

  return (
    <StyledPaginationNavigation $interactivePageNumber={interactivePageNumber}>
      {renderCurrentPage()}
      {totalPages > 1 && renderNavigationButtons()}
    </StyledPaginationNavigation>
  );
};

export default PaginationNavigation;
