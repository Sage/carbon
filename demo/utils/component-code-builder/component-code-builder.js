import { transform } from 'babel-standalone';
import { kebabCase } from 'lodash';

class ComponentCodeBuilder {
  constructor(name, withEvents) {
    let definition;

    if (typeof name !== 'string') {
      definition = name;
      this.wrap = definition.get('wrap');
      name = definition.get('topLevelComponent') || definition.get('name');
    }

    // the name of the component
    this.name = name;

    // start building the code
    if (this.wrap) {
      this.code = `<${this.wrap}`;
    } else {
      this.code = `<${name}`;
    }

    // by default we do not have any props
    this.hasProps = false;

    // by default we do not have any children
    this.hasChildren = false;

    // tracks if the component has been closed
    this.isClosed = false;

    // determines if the component requires an action to open it (eg. dialog)
    this.openPreview = false;

    if (this.wrap) {
      this.addProps(definition, withEvents);
      definition = definition.set('wrap', false);
      this.addChild(new ComponentCodeBuilder(definition));
    } else if (definition) {
      this.addProps(definition, withEvents);
    }
  }

  // adds multiple props to the code based on a definition
  addProps = (definition, withEvents) => {
    let props = definition.get('propValues'),
        children = props.get('children');
    const propTypes = definition.get('propTypes'),
        wrapProps = definition.get('wrapProps'),
        toggleFunctions = definition.get('toggleFunctions'),
        js = definition.get('js'),
        wrap = definition.get('wrap');

    if (wrap && wrapProps && wrapProps.count()) {
      props = props.filter((prop, key) => {
        return wrapProps.includes(key);
      });
      children = null;
    } else if (wrapProps && wrapProps.count()) {
      props = props.filter((prop, key) => {
        return !wrapProps.includes(key);
      });
    }

    this.openPreview = definition.get('openPreview');

    props.forEach((value, prop) => {
      if (prop !== 'children' && !toggleFunctions.includes(prop)) {
        if (withEvents || (prop !== 'data-binding' && typeof value !== 'function')) {
          this.addProp(prop, value, propTypes.get(prop));
        }
      } else if (toggleFunctions.includes(prop) && value) {
        this.addProp(prop, `() => { alert("${prop}"); }`, 'Function');
      }
    });

    if (children) {
      if (typeof children === 'object') {
        children.forEach((child) => {
          const childCode = new ComponentCodeBuilder(child);
          this.addChild(childCode);
        });
      } else {
        this.addChild(children);
      }
    }

    if (js) {
      this.addJS(js);
    }
  }

  // adds a prop to the code
  addProp = (prop, value, type) => {
    if (this.hasChildren || this.isClosed) {
      throw new Error(`You cannot add props after you have added children or closed your component!
         See the ComponentCodeBuilder for '${this.name}'.\n\nCurrent markup:\n\n${this.code}`);
    }

    if (value || value === '' || value === false) {
      this.hasProps = true;

      if (typeof value === 'string' && (type === 'String' || type === undefined)) {
        if (/\n/.test(value)) {
          value = value.replace(/\n/g, '\\n');
          this.code += `\n  ${prop}={ '${value}' }`;
        } else {
          this.code += `\n  ${prop}="${value.replace(/"/g, "'")}"`;
        }
      } else {
        this.code += `\n  ${prop}={ ${value} }`;
      }
    }
  }

  // adds children to the component
  addChild = (child) => {
    if (this.isClosed) {
      throw new Error(`You cannot add children after you have closed your component!
         See the ComponentCodeBuilder for '${this.name}'.\n\nCurrent markup:\n\n${this.code}`);
    }

    let spaces = '  ';

    // add spaces to child with code
    if (child.code) {
      child.close();
      child.code = child.code.replace(/^/gm, spaces);
      spaces = '';
    }

    if (this.hasChildren) {
      this.code += `\n${spaces}${child}`;
    } else {
      if (this.hasProps) {
        this.code += '\n>\n';
      } else {
        this.code += '>\n';
      }
      this.code += `${spaces}${child}`;
      this.hasChildren = true;
    }
  }

  // adds javascript making it available before the JSX
  addJS = (js) => {
    this.code = js + '\n\n' + this.code
  }

  // closes the component tag
  close = () => {
    if (this.isClosed) { return; }

    if (this.hasChildren) {
      this.code += `\n</${this.wrap || this.name}>`;
    } else if (this.hasProps) {
      this.code += '\n/>';
    } else {
      this.code += ' />';
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
    let code = this.toString();

    if (this.openPreview) {
      code = this._addOpenPreview(code);
    }

    return eval(transform(code, { presets: ['es2015', 'react'] }).code);
  }

  // adds a button to open the preview of the component
  _addOpenPreview = (code) => {
    return `
      <div>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={ () => {
            Dispatcher.dispatch({
              actionType: ComponentConstants.UPDATE_DEFINITION,
              name: '${kebabCase(this.name)}',
              prop: 'open',
              value: true,
              wrap: true
            })
          } }>Open Preview</Button>
        </div>
        ${code}
      </div>
    `;
  }
}

export default ComponentCodeBuilder;
