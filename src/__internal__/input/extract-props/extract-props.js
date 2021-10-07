export default function extractProps(props, reactComponent) {
  const expectedKeys = reactComponent.safeProps;
  const mainObjectKeys = Object.keys(props);
  const filteredKeys = mainObjectKeys.filter((key) =>
    expectedKeys.includes(key)
  );
  const filteredObject = filteredKeys.reduce((obj, key) => {
    return { ...obj, [key]: props[key] };
  }, {});

  return filteredObject;
}
