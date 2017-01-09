class ComponentCodeBuilder {
  constructor(name) {
    // the name of the component
    this.name = name;

    // start building the code
    this.code = `<${name}`;

    // by default we do not have any props
    this.hasProps = false;

    // by default we do not have any children
    this.hasChildren = false;

    // tracks if the component has been closed
    this.isClosed = false;
  }

  // adds multiple props to the code based on the keys and data hash
  addProps = (props, data) => {
    for (let index in props) {
      let prop = props[index];
      return this.addProp(prop, data.get(prop));
    }
  }

  // adds a prop to the code
  addProp = (prop, value) => {
    if (this.hasChildren || this.isClosed) {
      throw new Error(`You cannot add props after you have added children or closed your component! See the ComponentCodeBuilder for '${this.name}'.\n\nCurrent markup:\n\n${this.code}`);
    }

    if (value) {
      this.hasProps = true;
      if (typeof value === "string") {
        this.code += `\n  ${prop}='${value}'`;
      } else {
        this.code += `\n  ${prop}={ ${value} }`;
      }
    }
  }

  // adds children to the component
  addChild = (child) => {
    if (this.isClosed) {
      throw new Error(`You cannot add children after you have closed your component! See the ComponentCodeBuilder for '${this.name}'.\n\nCurrent markup:\n\n${this.code}`);
    }

    let spaces = "  ";

    // add spaces to child with code
    if (child.code) {
      child.close();
      child.code = child.code.replace(/^/gm, spaces);
      spaces = "";
    }

    if (this.hasChildren) {
      this.code += `\n${spaces}${child}`;
    } else {
      if (this.hasProps) {
        this.code += `\n>\n`;
      } else {
        this.code += `>\n`;
      }
      if (child.length && typeof child !== 'string') {
        child.forEach((c) => {
          this.code += `${spaces}<${c.type.displayName.replace('_', '')} />\n`;
        });
      } else {
        this.code += `${spaces}${child}\n`;
      }
      this.hasChildren = true;
    }
  }

  // closes the component tag
  close = () => {
    if (this.isClosed) { return; }

    if (this.hasChildren) {
      this.code += `</${this.name}>`;
    } else if (this.hasProps) {
      this.code += "\n/>";
    } else {
      this.code += " />";
    }

    this.isClosed = true;
  }

  // returns the code
  toString = () => {
    if (!this.isClosed) { this.close(); }

    return this.code;
  }
}

export default ComponentCodeBuilder;
