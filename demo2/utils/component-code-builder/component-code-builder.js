import { transform } from 'babel-standalone';

class ComponentCodeBuilder {
  constructor(name, withEvents) {
    let definition;

    if (typeof name !== "string") {
      definition = name;
      name = definition.get('name');
    }

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

    if (definition) {
      this.addProps(definition, withEvents);
    }
  }

  // adds multiple props to the code based on a definition
  addProps = (definition, withEvents) => {
    let props = definition.get('propValues'),
        children = props.get('children');

    props.forEach((value, prop) => {
      if (prop !== "children") {
        if (withEvents || (prop !== "data-binding" && typeof value !== "function")) {
          this.addProp(prop, value);
        }
      }
    });

    if (children) {
      if (typeof children === "object") {
        children.forEach((child) => {
          let childCode = new ComponentCodeBuilder(child);
          this.addChild(childCode);
        });
      } else {
        this.addChild(children);
      }
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
      this.code += `${spaces}${child}`;
      this.hasChildren = true;
    }
  }

  // closes the component tag
  close = () => {
    if (this.isClosed) { return; }

    if (this.hasChildren) {
      this.code += `\n</${this.name}>`;
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

  // returns component
  toComponent = () => {
    return eval(transform(this.toString(), { presets: ['es2015', 'react'] }).code);
  }
}

export default ComponentCodeBuilder;
