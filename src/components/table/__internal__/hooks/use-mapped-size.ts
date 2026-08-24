import { useMemo } from "react";

export default (size: "extra-small" | "small" | "medium" | "large" | "extra-large") => {
  const mappedSize = useMemo(() => {
      switch (size) {
        case "extra-small":
        case "small":
          return "small";
        case "large":
        case "extra-large":
          return "large";
        default:
          return "medium";
      }
    }, [size]);

    return mappedSize;
};