import toJson from "enzyme-to-json";

function snapshotWithoutProps(enzymeWrapper, propNames) {
  let propNameList = propNames;

  if (!Array.isArray(propNames)) {
    propNameList = [propNames];
  }

  const snapshotOptions = {
    map: (json) => {
      propNameList.forEach((prop) => {
        if (json.props[prop]) {
          json.props[prop] = `[ ${prop} object ]`;
        }
      });

      return json;
    },
  };

  return toJson(enzymeWrapper, snapshotOptions);
}

function noThemeSnapshot(enzymeWrapper) {
  return snapshotWithoutProps(enzymeWrapper, "theme");
}

export { snapshotWithoutProps, noThemeSnapshot };
