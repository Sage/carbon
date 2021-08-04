const ValidationsHelper = {
  /**
   * Return the comparison type depending on params
   *
   * @method comparisonType
   * @param {Object} params
   * @return {String} function type to call
   */
  comparisonType: (params) => {
    const is = typeof params.is !== "undefined",
      max = typeof params.max !== "undefined",
      min = typeof params.min !== "undefined";

    if (is && !max && !min) return "Exact";
    if (!is && max && !min) return "Less";
    if (!is && min && !max) return "Greater";
    if (!is && min && max) return "Range";
    return null;
  },
};

export default ValidationsHelper;
