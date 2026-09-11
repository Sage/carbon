import React from "react";

import Loader, { LoaderProps } from ".";

interface LoaderBenchmarkFixtureProps {
  count: number;
  loaderType: LoaderProps["loaderType"];
  variant?: LoaderProps["variant"];
}

const LoaderBenchmarkFixture = ({
  count,
  loaderType,
  variant,
}: LoaderBenchmarkFixtureProps) => (
  <div
    data-role="loader-benchmark-batch"
    style={{
      display: "grid",
      gap: "8px",
      gridTemplateColumns: "repeat(10, minmax(64px, 1fr))",
      width: "1280px",
    }}
  >
    {Array.from({ length: count }, (_, index) => (
      <Loader
        // The index is stable because benchmark batches are never reordered.
        key={index}
        loaderType={loaderType}
        variant={variant}
        showLabel={false}
      />
    ))}
  </div>
);

export default LoaderBenchmarkFixture;
