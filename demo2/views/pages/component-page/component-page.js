import React from 'react';

import SubPageChrome from '../../sub-page-chrome';
import PageContentArea from '../../page-sections/page-content-area';

import ComponentList from '../../chrome/menu/component-list';

class ComponentPage extends React.Component {
  render() {
    let def = this.props.definition;

    let position = this._componentPosition(def);

    return (
      <SubPageChrome
        subtitle={ def.text.description }
        title={ def.text.name }
        titleAppend={ def.text.type }
        previousPage={ ComponentList[this._previousComponent(this._componentPosition(def))] }
        nextPage={ ComponentList[this._nextComponent(this._componentPosition(def))] }
      >
        <PageContentArea
          title='Preview'
          link={ `https://github.com/Sage/carbon/tree/master/src/components/${def.key}` }
        >
          { React.createElement(def.component, def.demoProps) }
        </PageContentArea>
        <PageContentArea title='Designer Notes'>
          { def.text.details }
        </PageContentArea>
      </SubPageChrome>
    );
  }

  /**
   * gets the component array position for propulating next and previous
   *
   * @private
   * @method _componentPosition
   * @param {Object} definition
   * @return {Number} position of the component in the array
   */
  _componentPosition = (definition) => {
    return ComponentList.findIndex((component) => {
      return component.href === definition.key;
    });
  }

  /**
   * cyclically retrieves next component
   *
   * @private
   * @method _nextComponent
   * @param {Number} current - current position
   * @return {Object} ComponentList element
   */
  _nextComponent = (current) => {
    return current === ComponentList.length - 1
      ? 0
      : current + 1;
  }

  /**
   * cyclically retrieves previous component
   *
   * @private
   * @method _previousComponent
   * @param {Number} current - current position
   * @return {Object} ComponentList element
   */
  _previousComponent = (current) => {
    return current === 0
      ? ComponentList.length - 1
      : current - 1;
  }
}

export default ComponentPage;

