# Pager: Default

```tsx
import { useState } from "react";
import Pager from "carbon-react/lib/components/pager";

export const PagerDefaultExample = () => {
  const args = {
    totalRecords: "1000",
    currentPage: "2",
  };
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );
  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  return (
    <Pager
      onPagination={handlePagination}
      {...args}
      currentPage={currentPage}
    />
  );
};
```
