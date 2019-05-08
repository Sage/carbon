describe('tabHeaders', () => {
    it('renders unordered list of headers', () => {
      expect(instance.tabHeaders.type).toBe('ul');
    });

    it('has the role of tablist', () => {
      expect(instance.tabHeaders.props.role).toEqual('tablist');
    });

    it('renders a list item for each tab passed to the tabs', () => {
      expect(instance.tabHeaders.props.children.length).toEqual(3);
    });

    it('adds a data-tabid to each list item', () => {
      expect(instance.tabHeaders.props.children[0].props['data-tabid']).toEqual('uniqueid1');
    });

    it('adds a role of tab to each list item', () => {
      expect(instance.tabHeaders.props.children[0].props.role).toEqual('tab');
    });

    it('sets aria-selected to true for the selected tab', () => {
      expect(instance.tabHeaders.props.children[0].props['aria-selected']).toBeTruthy();
      expect(instance.tabHeaders.props.children[1].props['aria-selected']).toBeFalsy();
      expect(instance.tabHeaders.props.children[2].props['aria-selected']).toBeFalsy();
    });

    describe('when passed a null child', () => {
      it('ignores the null child', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceWithNull, 'carbon-tabs__headers__header')
        expect(headers.length).toEqual(1);
      });
    });

    describe('when there is only one child', () => {
      it('renders a single header', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceOneChild, 'carbon-tabs__headers__header')
        expect(headers.length).toEqual(1);
      });
    });

    describe('when a align prop is passed', () => {
      it('adds a aligned class', () => {
        let instance = TestUtils.renderIntoDocument(
          <Tabs align='right'>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>
        );

        let headers = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul')
        expect(headers.className).toEqual('carbon-tabs__headers carbon-tabs__headers--align-right carbon-tabs__headers');
      });
    });
  });

  describe('tabsHeaderClasses', () => {
    it('adds a carbon-tabs__headers class to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers')).toEqual(true);
    });

    it('adds the align className included in the props to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers--align-left')).toEqual(true);
    });

    it('adds the position className included in the props to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers')).toEqual(true);
    });
  });