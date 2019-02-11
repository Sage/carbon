/*
Given a base color hex will return a function that expects
some given opactiy and returns the base color at that
opacity.
 */
export default (base) => {
  const rgb = base.match(/[^#]{2}/g)
    .map(pair => parseInt(pair, 16));

  return opacity => `rgba(${rgb.join(',')},${opacity})`;
};
