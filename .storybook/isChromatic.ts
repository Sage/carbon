import isChromatic from "chromatic/isChromatic";

export default () => {
  // We need to work out if this is a chromatic build so we can still use the theme selector on the hosted storybook
  return (
    (isChromatic() &&
      window.origin !== process.env.STORYBOOK_CHROMATIC_ORIGIN) ||
    // To debug the chromatic build you can use the query param `debug_chromatic`
    new URLSearchParams(window.location.search).get("debug_chromatic") !== null
  );
};
