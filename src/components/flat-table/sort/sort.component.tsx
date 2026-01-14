import React, { useRef } from "react";
import { useStrictFlatTableContext } from "../__internal__/strict-flat-table.context";
import Typography from "../../typography";
import Event from "../../../__internal__/utils/helpers/events";
import guid from "../../../__internal__/utils/helpers/guid";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import useLocale from "../../../hooks/__internal__/useLocale";
import Icon from "../../icon";
import StyledSortButton from "./sort.style";

export interface SortProps extends TagProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending";
  /** Callback fired when the component is clicked */
  onClick?: () => void;
  /** Sets the text content of the component */
  children?: string;
  /** Sets the accessible name of the component */
  accessibleName?: string;
}

const Sort = ({
  children,
  onClick,
  sortType,
  accessibleName,
  "data-element": dataElement,
  "data-role": dataRole,
}: SortProps) => {
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
        data-element="sort-icon"
        type={sortType === "ascending" ? "sort_up" : "sort_down"}
      />
    ) : (
      <span data-role="sort-placeholder" />
    );

  return (
    <>
      <Typography screenReaderOnly id={id.current}>
        {accessibleName || locale.sort.accessibleName(children, sortType)}
      </Typography>

      <StyledSortButton
        aria-labelledby={id.current}
        colorTheme={colorTheme}
        data-component="sort"
        data-element={dataElement}
        data-role={dataRole}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <span>{children}</span>
        {icon()}
      </StyledSortButton>
    </>
  );
};

export default Sort;
