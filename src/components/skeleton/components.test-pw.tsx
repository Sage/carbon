import React from "react";
import Skeleton, { SkeletonProps } from ".";

const SkeletonComponent = (props: SkeletonProps) => {
  return <Skeleton loading {...props} />;
};
export default SkeletonComponent;
