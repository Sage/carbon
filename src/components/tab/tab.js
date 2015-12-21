import React from 'react';

class Tab extends React.Component {

  static defaultProps = {
    renderHiddenTabs: true,
  }

  static childContextTypes = {
    tab: React.PropTypes.object
  }

  getChildContext() {
    return {
      tab: {
        changeValidity: this.changeValidity
      }
    };
  }

  state = {
    tabValidity: {}
  }

  changeValidity = (id, valid) => {
    let tabValidity = this.state.tabValidity;
    tabValidity[id] = valid
    this.setState({ tabValidity: tabValidity });  
  }

  componentWillMount() {
    let numOfTabs = this.props.numberOfTabs || React.Children.count(this.props.children);
    let initialSelectedTab = this.props.initialTab || 0;

    this.setState({ numberOfTabs: numOfTabs, selectedTab: initialSelectedTab });
  }

  handleTabClick = (ev) => {
    this.setState({ selectedTab: Number(ev.target.dataset.tab) })
  }

  get mainClasses() {
    return 'ui-tab';
  }

  get tabHeaders() {
    let tabTitles = React.Children.map(this.props.children, ((child, index) => {

      let validClass = ''
       
      if (this.state.tabValidity[index] == false) {
        validClass = ' ui-tab__headers__header--error';
      }

      let selectedClassName = index === this.state.selectedTab ? ' selected' : '';

      return(
      <li
        className={ "ui-tab__headers__header" + selectedClassName + validClass }
        onClick={ this.handleTabClick }
        key={ child.props.title }
        data-tab={ index } >
          { child.props.title }
      </li>);
    }));

    return <ul className='ui-tab__headers' >{ tabTitles }</ul>;
  }

  get visibleTab() {
    let clone = React.cloneElement(child, { id: this.selectedTab });
    return <div className='selected'>{ clone }</div>
  }

  get tabs() {
    if (!this.props.renderHiddenTabs) { return this.visibleTab; }

    let tabs;

    tabs = React.Children.map(this.props.children, ((child, index) => {
      let klass = 'hidden';

      if (index === this.state.selectedTab) {
        klass = 'selected';
      }

      let clone = React.cloneElement(child, { id: index });
      return <div className={ klass }>{ clone }</div>
    }));

    return tabs;
  }

  render() { 
    return(
      <div className={ this.mainClasses }>
        { this.tabHeaders }
        { this.tabs }
      </div>
    );
  }
}

export default Tab;
