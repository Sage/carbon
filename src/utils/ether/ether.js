let Ether = {
  //Use String literal rather than String Object for better performance
  toString: (value) => {
    return `${value}`;
  },

  styleElement: (element, attribute, value) => {
    return element.style[attribute] = Ether.toString(value);
  },

  pixelValue: (value) => {
    return `${value}px`;
  },
};

export default Ether;
