import React, { useCallback } from "react";
import useLocale from "../../../../hooks/__internal__/useLocale";
import StyledOptionRow from "../../option-row/option-row.style";
import StyledOption from "../../option/option.style";
import Option, { OptionProps } from "../../option";
import OptionRow, {
  OptionRowProps,
} from "../../option-row/option-row.component";
import highlightPartOfText from "./highlight-part-of-text";

const filterOptions = (option: React.ReactElement, filterText: string) => {
  const processedText = option.props.text?.toLowerCase();
  const processedValue = filterText.toLowerCase();
  if (processedText.includes(processedValue)) {
    return option;
  }
  return null;
};

const filterOptionRows = (
  optionRow: React.ReactElement,
  filterText: string,
) => {
  const cells = React.Children.toArray(optionRow.props.children);

  const hasText = cells.find((cell) => {
    /* istanbul ignore if */
    if (!React.isValidElement(cell)) {
      return false;
    }
    if (typeof cell.props.children === "string") {
      const processedText = cell.props.children.toLowerCase();
      const processedValue = filterText.toLowerCase();
      return processedText.includes(processedValue);
    }
    // filter recursively based on children
    return filterOptionRows(cell, filterText);
  });

  if (hasText) {
    return optionRow;
  }
  return null;
};

const filterChildren = (filterText: string) => (children: React.ReactNode) => {
  const filteredChildren = React.Children.map(children, (child) => {
    /* istanbul ignore if */
    if (!React.isValidElement(child)) {
      return null;
    }
    if (child.type === Option) {
      return filterOptions(child, filterText);
    }
    /* istanbul ignore else */
    if (child.type === OptionRow) {
      return filterOptionRows(child, filterText);
    }
    /* istanbul ignore next */
    return null;
  });

  if (React.Children.count(filteredChildren)) return filteredChildren;
  return null;
};

function addHighlightedContent(
  filteredElements: React.ReactNode,
  filterText: string,
) {
  return React.Children.map(filteredElements, (child) => {
    let highlightedContent;
    /* istanbul ignore if */
    if (!React.isValidElement<OptionProps | OptionRowProps>(child)) {
      return child;
    }
    if (child.type === Option) {
      highlightedContent = highlightPartOfText(child.props.text, filterText);
    }

    if (child.type === OptionRow) {
      highlightedContent = React.Children.map(child.props.children, (cell) => {
        /* istanbul ignore if */
        if (!React.isValidElement<{ children: React.ReactNode }>(cell)) {
          return cell;
        }
        return React.cloneElement(cell, {
          children: highlightPartOfText(cell.props.children, filterText),
        });
      });
    }

    return React.cloneElement(child, { children: highlightedContent });
  });
}

interface WrappedComponentProps {
  filterText?: string;
  isLoading?: boolean;
  multiColumn?: boolean;
  tableHeader?: React.ReactNode;
  children?: React.ReactNode;
}

export interface FilteredComponentProps extends WrappedComponentProps {
  noResultsMessage?: string;
}

/** Filters wrapped component children based on provided filter text and highlights matching content */
const withFilter = <T extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
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
      }: FilteredComponentProps & T,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const l = useLocale();

      const getFilteredChildren = useCallback(() => {
        let filteredElements = children;

        if (filterText && !isLoading) {
          filteredElements = filterChildren(filterText)(children);

          if (!filteredElements) {
            const noResultsText = l.select.noResultsForTerm(filterText);

            if (multiColumn) {
              const colSpan = React.isValidElement(tableHeader)
                ? /* istanbul ignore next */ React.Children.count(
                    tableHeader?.props?.children,
                  )
                : 1;
              return (
                <StyledOptionRow>
                  <td style={{ fontWeight: "normal" }} colSpan={colSpan}>
                    {noResultsMessage || noResultsText}
                  </td>
                </StyledOptionRow>
              );
            }

            return (
              <StyledOption isInteractive>
                {noResultsMessage || noResultsText}
              </StyledOption>
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
        l,
      ]);

      const wrappedComponentProps = {
        filterText,
        isLoading,
        multiColumn,
        tableHeader,
        ...props,
      } as T;

      return (
        <WrappedComponent {...wrappedComponentProps} ref={forwardedRef}>
          {getFilteredChildren()}
        </WrappedComponent>
      );
    },
  );

  FilteredComponent.displayName = "FilteredComponent";

  return FilteredComponent;
};

export default withFilter;
