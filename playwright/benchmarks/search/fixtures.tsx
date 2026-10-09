import React, { useMemo, useState } from "react";
import Search from "../../../src/components/search";
import type { SearchListGroup } from "../../../src/components/search";
import SEARCH_RESULT_COUNT from "./workload";
import useFixtureReset from "../use-fixture-reset";

/** Includes the consumer's controlled value and submission state in the profile. */
export const ControlledSearchFixture = () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const reset = () => {
    setQuery("");
    setSubmittedQuery("");
  };
  const resetRef = useFixtureReset(reset);

  return (
    <div style={{ width: 480 }}>
      <button type="button" ref={resetRef} data-benchmark-reset onClick={reset}>
        Reset search fixture
      </button>
      <Search
        label="Search products"
        searchButtonAriaLabel="Submit search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClick={(event) => setSubmittedQuery(event.target.value)}
      />
      <output data-search-submission>{submittedQuery}</output>
    </div>
  );
};

const products = Array.from({ length: SEARCH_RESULT_COUNT }, (_, index) => {
  const number = String(index + 1).padStart(3, "0");
  return {
    value: `product-${number}`,
    label: `Product ${number}`,
    id: `search-result-${number}`,
    subtext: `Inventory item ${number}`,
    selectedIcon: true,
    disabled: index === 4,
  };
});

/** Local filtering is intentional: the workload has no network variability. */
export const GroupedSearchFixture = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const reset = () => {
    setQuery("");
    setOpen(false);
    setSelectedProduct("");
  };
  const resetRef = useFixtureReset(reset);
  const listData = useMemo<SearchListGroup[]>(() => {
    const groups = Array.from({ length: 4 }, (_, index) => ({
      heading: `Product group ${index + 1}`,
      items: products
        .slice(index * 25, (index + 1) * 25)
        .filter((product) =>
          product.label.toLowerCase().includes(query.toLowerCase()),
        ),
    }));
    return groups.filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div style={{ width: 480, minHeight: 400 }}>
      <button type="button" ref={resetRef} data-benchmark-reset onClick={reset}>
        Reset search fixture
      </button>
      <Search
        label="Search products"
        searchButtonAriaLabel="Submit search"
        value={query}
        open={open}
        listData={listData}
        maxHeight="280px"
        minQueryLength={3}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(event.target.value.length >= 3);
        }}
        onListItemSelect={(value) => {
          const product = products.find((item) => item.value === value);
          if (!product) return;
          setQuery(product.label);
          setSelectedProduct(value);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
      <output data-search-selection>{selectedProduct}</output>
    </div>
  );
};
