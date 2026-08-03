import { useState, useEffect } from "react";
import { getWindow } from "../../../../__internal__/dom/globals";

export default (modeOverride?: "light" | "dark" | "auto") => {
  let override: "light" | "dark" | undefined;
  if (modeOverride && modeOverride !== "auto") {
    override = modeOverride;
  }
  const [systemPreference, setSystemPreference] = useState<"light" | "dark">(
    "light",
  );

  useEffect(() => {
    if (override) {
      return;
    }

    const mediaQuery = getWindow()?.matchMedia("(prefers-color-scheme: dark)");

    /* istanbul ignore if */
    if (!mediaQuery) return;

    setSystemPreference(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      /* istanbul ignore if */
      if (!mediaQuery) return;

      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [override]);

  return override ?? systemPreference;
};
