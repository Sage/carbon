import React, { useRef } from "react";
import { useStrictFlatTableContext } from "../__internal__/strict-flat-table.context";
import Event from "../../../__internal__/utils/helpers/events";
import guid from "../../../__internal__/utils/helpers/guid";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import useLocale from "../../../hooks/__internal__/useLocale";
import Icon from "../../icon";
import StyledSortButton from "./sort.style";
import Logger from "../../../__internal__/utils/logger";

export interface SortProps extends TagProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending";
  /** Callback fired when the component is clicked */
  onClick?: () => void;
  /** Sets the text content of the component */
  children?: string;
  /**
   * Sets the accessible name of the component
   * @deprecated this prop has been deprecated in favour of using `aria-live` regions
   * */
  accessibleName?: string;
  /** Sets the aria-roledescription of the component */
  "aria-roledescription"?: string;
}

let accessibleNameWarning = false;

export const Sort = ({
  children,
  onClick,
  sortType,
  accessibleName,
  "data-element": dataElement,
  "data-role": dataRole,
  "aria-roledescription": ariaRoleDescription,
}: SortProps) => {
  if (accessibleName && !accessibleNameWarning) {
    Logger.deprecate(
      "The `accessibleName` prop has been deprecated in favour of using `aria-live` regions. Please use an `aria-live` region to announce changes in sort order to assistive technologies.",
    );
    accessibleNameWarning = true;
  }

  const id = useRef(guid());
  const locale = useLocale();

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  const { colorTheme } = useStrictFlatTableContext();

  const icon = () =>
    sortType ? (
      <Icon
        aria-hidden
        data-element="sort-icon"
        type={sortType === "ascending" ? "sort_up" : "sort_down"}
      />
    ) : (
      <span data-role="sort-placeholder" />
    );

  return (
    <StyledSortButton
      aria-describedby={id.current}
      colorTheme={colorTheme}
      data-component="sort"
      data-element={dataElement}
      data-role={dataRole}
      onClick={onClick}
      onKeyDown={onKeyDown}
      data-sort-type={sortType || "none"}
      aria-roledescription={
        ariaRoleDescription || locale.sort?.ariaRoleDescription?.()
      }
    >
      <span>{children}</span>
      {icon()}
    </StyledSortButton>
  );
};

export default Sort;
