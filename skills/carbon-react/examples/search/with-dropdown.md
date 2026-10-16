# Search: With Dropdown

```tsx
import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Search from "carbon-react/lib/components/search";

export const SearchWithDropdownExample = () => {
  const minQueryLength = 2;

  const recentItems = [
    { value: "Recent term 1", label: "Recent term 1" },
    { value: "Recent term 2", label: "Recent term 2" },
    { value: "Recent term 3", label: "Recent term 3" },
  ];

  const suggestedItems = [
    { value: "Suggested term 1", label: "Suggested term 1" },
    { value: "Suggested term 2", label: "Suggested term 2" },
    { value: "Suggested term 3", label: "Suggested term 3" },
    { value: "Suggested term 4", label: "Suggested term 4" },
    { value: "Suggested term 5", label: "Suggested term 5" },
  ];

  const [value, setValue] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const match = <T extends { label: string }>(items: T[]) =>
    items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );

  const filteredRecent = match(recentItems);
  const filteredSuggested = match(suggestedItems);

  const listData = [
    ...(filteredRecent.length > 0
      ? [
          {
            heading: "Recent searches",
            icon: <Icon type="refresh_clock" />,
            items: filteredRecent,
          },
        ]
      : []),
    ...(filteredSuggested.length > 0
      ? [
          {
            heading: "Suggested",
            icon: <Icon type="search" />,
            items: filteredSuggested,
          },
        ]
      : []),
  ];

  const isOpen =
    value.length >= minQueryLength && listData.length > 0 && !dismissed;

  return (
    <Box height="300px" width="700px">
      <Search
        label="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        open={isOpen}
        minQueryLength={minQueryLength}
        listData={listData}
        onListItemSelect={(val) => {
          setValue(val);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
      />
    </Box>
  );
};
```
