import React, { useRef, useContext } from "react";
import Event from "../../../__internal__/utils/helpers/events";
import Typography from "../../typography";
import { StyledSort, StyledSpaceHolder, StyledSortIcon } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";
import useLocale from "../../../hooks/__internal__/useLocale";
import FlatTableContext from "../__internal__/flat-table.context";

export interface SortProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending";
  /** Callback fired when the component is clicked */
  onClick?: () => void;
  /** Sets the text content of the component */
  children?: string;
  /** Sets the accessible name of the component */
  accessibleName?: string;
}

export const Sort = ({
  children,
  onClick,
  sortType,
  accessibleName,
}: SortProps) => {
  const id = useRef(guid());
  const locale = useLocale();

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  const { colorTheme } = useContext(FlatTableContext);

  return (
    <>
      <Typography screenReaderOnly id={id.current}>
        {accessibleName || locale.sort.accessibleName(children, sortType)}
      </Typography>
      <StyledSort
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        sortType={sortType}
        aria-labelledby={id.current}
      >
        {children}
        {sortType && (
          <StyledSortIcon
            type={sortType === "ascending" ? "sort_up" : "sort_down"}
            iconColor={
              colorTheme === "dark"
                ? "--colorsActionMinorYang100"
                : "--colorActionMinor500"
            }
          />
        )}
      </StyledSort>
      {!sortType && <StyledSpaceHolder />}
    </>
  );
};

export default Sort;
