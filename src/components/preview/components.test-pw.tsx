import React from "react";
import Skeleton, { SkeletonProps } from "../skeleton";

const SkeletonComponent = (props: SkeletonProps) => {
  return <Skeleton loading {...props} />;
};
export default SkeletonComponent;
