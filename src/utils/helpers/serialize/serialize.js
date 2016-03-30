let serialize = (obj, prefix) => {
  let str = [];

  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(
        typeof v == "object" ?
          serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }

  return str.join("&");
}

export default serialize;
