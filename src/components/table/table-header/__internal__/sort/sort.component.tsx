import React, { ReactNode, useContext } from "react";
import { TagProps } from "../../../../../__internal__/utils/helpers/tags";
import useLocale from "../../../../../hooks/__internal__/useLocale";
import Icon from "../../../../../components/icon";
import StyledSortButton from "./sort.style";
import { TableContext, TableContextProps } from "../../../__internal__/contexts";

export interface SortProps extends TagProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType: "ascending" | "descending" | "unsorted";
  /** Callback fired when the component is clicked */
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Sets the content of the component */
  children?: ReactNode;
  /** Sets the aria-roledescription of the component */
  "aria-roledescription"?: string;
}

const getSortIconType = (sortType: "unsorted" | "ascending" | "descending") => {
  if (sortType === "descending") {
    return "sort_down";
  }

  if (sortType === "ascending") {
    return "sort_up";
  }

  return "fit_height";
}

export const Sort = ({
  children,
  onClick,
  sortType,
  "aria-roledescription": ariaRoleDescription,
  "data-element": dataElement,
  "data-role": dataRole,
}: SortProps) => {
  const locale = useLocale();
  const { variant } = useContext<TableContextProps>(TableContext);

  const icon = () =>
    (
      <Icon
        aria-hidden
        data-element="sort-icon"
        type={getSortIconType(sortType)}
      />
    );

  return (
    <StyledSortButton
      $variant={variant}
      data-component="sort"
      data-element={dataElement}
      data-role={dataRole}
      onClick={onClick}
      data-sort-type={sortType}
      aria-roledescription={
        ariaRoleDescription || locale.table?.sort?.ariaRoleDescription?.()
      }
    >
      {children}
      {icon()}
    </StyledSortButton>
  );
};

export default Sort;
