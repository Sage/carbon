import React, { useState } from "react";
import Pager, { PagerProps } from ".";

export const PagerComponent = (props: Partial<PagerProps>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <Pager
      currentPage={currentPage}
      onPagination={handlePagination}
      totalRecords="100"
      {...props}
    />
  );
};

export default PagerComponent;
