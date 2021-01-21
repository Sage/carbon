export const compareJsonValues = (jsonToCompare, masterJson) => {
  _.isEqual(jsonToCompare, masterJson);
};

export const parseJsonData = (jsonToParse) => {
  const parsedData = JSON.parse(JSON.stringify(jsonToParse));
  for (const key in parsedData) {
    if (key === 'message') {
      console.log(parsedData[key]);
      return parsedData[key];
    }
  }
};

export const splitString = (message) => {
  const newElement = message.split(',');

  // get values from splitted string
  function getValues(element) {
    return element.split(':')[1].trim();
  }

  // aasign all needed values
  const component = getValues(newElement[0]);
  const phase = getValues(newElement[1]);
  const actualTime = getValues(newElement[2]);
  const startTime = getValues(newElement[3]);
  const baseTime = getValues(newElement[4]);
  const commitTime = getValues(newElement[5]);

  const convertedObject = new Array();
  convertedObject.push({ 'component:': component });
  convertedObject.push({ 'phase:': phase });
  convertedObject.push({ 'actualTime:': actualTime });
  convertedObject.push({ 'startTime:': startTime });
  convertedObject.push({ 'baseTime:': baseTime });
  convertedObject.push({ 'commitTime:': commitTime });
  const json = Object.assign({}, convertedObject);
  return json;
};

export const getTiming = (input) => {
  const timeRexeg = /\d+/;
  const time = input.match(timeRexeg);
  console.log(time);
  return time;
};
