let serialize = (obj, prefix) => {
  let str = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let key = prefix ? prefix + "[" + prop + "]" : prop,
          value = obj[prop];

      str.push(
        typeof value == "object" ?
          serialize(value, key) :
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
      );
    }
  }

  return str.join("&");
}

export default serialize;
