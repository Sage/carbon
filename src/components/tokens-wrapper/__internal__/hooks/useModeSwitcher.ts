import { useState, useEffect } from "react";
import { getWindow } from "../../../../__internal__/dom/globals";

export default (modeOverride?: "light" | "dark") => {
  const [modePreference, setModePreference] = useState<"light" | "dark">(
    modeOverride || "light",
  );

  useEffect(() => {
    if (modeOverride) {
      setModePreference(modeOverride);
      return;
    }

    const mediaQuery = getWindow()?.matchMedia("(prefers-color-scheme: dark)");

    /* istanbul ignore if */
    if (!mediaQuery) return;

    setModePreference(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setModePreference(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      /* istanbul ignore if */
      if (!mediaQuery) return;

      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [modeOverride]);

  return modePreference;
};
