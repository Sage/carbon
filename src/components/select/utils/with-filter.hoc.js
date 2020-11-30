import React, { useCallback } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import filterChildren from "../../../utils/filter-children";
import StyledOption from "../option/option.style";
import highlightPartOfText from "./highlight-part-of-text";

/** Filters wrapped component children based on provided filter text and highlights matching content */
const withFilter = (WrappedComponent) => {
  const FilteredComponent = React.forwardRef(
    (
      { children, filterText, noResultsMessage, isLoading, ...props },
      forwardedRef
    ) => {
      const getFilteredChildren = useCallback(() => {
        let filteredElements = children;

        if (filterText && !isLoading) {
          filteredElements = filterChildren({ value: filterText })(children);

          if (!filteredElements) {
            const noResultsText = I18n.t("select.no_results_for_term", {
              defaultValue: 'No results for "%{term}"',
              term: filterText,
            });

            return (
              <StyledOption>{noResultsMessage || noResultsText}</StyledOption>
            );
          }

          return addHighlightedContent(filteredElements, filterText);
        }

        return children;
      }, [children, filterText, isLoading, noResultsMessage]);

      return (
        <WrappedComponent
          filterText={filterText}
          isLoading={isLoading}
          {...props}
          ref={forwardedRef}
        >
          {getFilteredChildren()}
        </WrappedComponent>
      );
    }
  );

  function addHighlightedContent(filteredElements, filterText) {
    return React.Children.map(filteredElements, (child) => {
      const highlightedContent = highlightPartOfText(
        child.props.text,
        filterText
      );

      return React.cloneElement(child, { children: highlightedContent });
    });
  }

  FilteredComponent.propTypes = {
    forwardedRef: PropTypes.object,
    children: PropTypes.node,
    filterText: PropTypes.string,
    noResultsMessage: PropTypes.string,
    isLoading: PropTypes.bool,
  };

  return FilteredComponent;
};

export default withFilter;
