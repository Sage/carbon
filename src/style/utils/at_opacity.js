export default (base) => {
  const parse = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(base);

  const r = parseInt(parse[1], 16),
      g = parseInt(parse[2], 16),
      b = parseInt(parse[3], 16);

  return opactiy => `rgba(${r},${g},${b},${opactiy})`;
};
