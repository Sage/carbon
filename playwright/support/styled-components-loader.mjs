import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      specifier === "styled-components" &&
      context.conditions.includes("import")
    ) {
      return nextResolve(
        new URL("./styled-components.mjs", import.meta.url).href,
        context,
      );
    }

    return nextResolve(specifier, context);
  },
});
