import React, { useCallback } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import StyledOptionRow from "../option-row/option-row.style";
import StyledOption from "../option/option.style";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import highlightPartOfText from "./highlight-part-of-text";

const filterOptions = (option, filterText) => {
  const processedText = option.props.text?.toLowerCase();
  const processedValue = filterText.toLowerCase();
  if (processedText.includes(processedValue)) {
    return option;
  }
  return null;
};

const filterOptionRows = (optionRow, filterText) => {
  const cells = React.Children.toArray(optionRow.props.children);

  const hasText = cells.find((cell) => {
    if (typeof cell.props.children === "string") {
      const processedText = cell.props.children.toLowerCase();
      const processedValue = filterText.toLowerCase();
      return processedText.includes(processedValue);
    }
    return false;
  });

  if (hasText) {
    return optionRow;
  }
  return null;
};

const filterChildren = (filterText) => (children) => {
  // eslint-disable-next-line consistent-return
  const filteredChildren = React.Children.map(children, (child) => {
    if (child.type === Option) {
      return filterOptions(child, filterText);
    }
    if (child.type === OptionRow) {
      return filterOptionRows(child, filterText);
    }
    return null;
  });

  if (React.Children.count(filteredChildren)) return filteredChildren;
  return null;
};

/** Filters wrapped component children based on provided filter text and highlights matching content */
const withFilter = (WrappedComponent) => {
  const FilteredComponent = React.forwardRef(
    (
      {
        children,
        filterText,
        noResultsMessage,
        isLoading,
        multiColumn,
        tableHeader,
        ...props
      },
      forwardedRef
    ) => {
      const getFilteredChildren = useCallback(() => {
        let filteredElements = children;

        if (filterText && !isLoading) {
          filteredElements = filterChildren(filterText)(children);

          if (!filteredElements) {
            const noResultsText = I18n.t("select.no_results_for_term", {
              defaultValue: 'No results for "%{term}"',
              term: filterText,
            });

            if (multiColumn) {
              const colSpan = React.Children.count(
                tableHeader?.props?.children
              );
              return (
                <StyledOptionRow>
                  <td style={{ fontWeight: "normal" }} colSpan={colSpan}>
                    {noResultsMessage || noResultsText}
                  </td>
                </StyledOptionRow>
              );
            }

            return (
              <StyledOption>{noResultsMessage || noResultsText}</StyledOption>
            );
          }

          return addHighlightedContent(filteredElements, filterText);
        }

        return children;
      }, [
        children,
        filterText,
        isLoading,
        multiColumn,
        noResultsMessage,
        tableHeader,
      ]);

      return (
        <WrappedComponent
          filterText={filterText}
          isLoading={isLoading}
          multiColumn={multiColumn}
          tableHeader={tableHeader}
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
      let highlightedContent;
      if (child.type === Option) {
        highlightedContent = highlightPartOfText(child.props.text, filterText);
      }

      if (child.type === OptionRow) {
        highlightedContent = React.Children.map(child.props.children, (cell) =>
          React.cloneElement(cell, {
            children: highlightPartOfText(cell.props.children, filterText),
          })
        );
      }

      return React.cloneElement(child, { children: highlightedContent });
    });
  }

  FilteredComponent.propTypes = {
    forwardedRef: PropTypes.object,
    children: PropTypes.node,
    filterText: PropTypes.string,
    noResultsMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    multiColumn: PropTypes.bool,
    tableHeader: PropTypes.node,
  };

  return FilteredComponent;
};

export default withFilter;
