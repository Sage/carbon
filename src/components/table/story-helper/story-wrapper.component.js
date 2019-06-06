import React from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
// import { State, Store } from '@sambego/storybook-state';
// import countriesList from '../../../../demo/data/countries';
import Button from '../../button';
import MultiActionButton from '../../multi-action-button';
import {
  Table
} from '../table.component';

const StoryWrapper = (props, store) => {
  class Wrapper extends React.Component {
    constructor() {
      super();

      this.state = {
        pageSize: '10'
      };
    }

    handleChange = (e, tableOptions) => {
      const { sortOrder, sortedColumn, currentPage } = tableOptions;

      store.set({ sortOrder, sortedColumn, currentPage });
      action('change')(e, tableOptions);
    };

    handlePagination = (size) => {
      this.setState({ pageSize: size });
    };

    render() {
      props.pageSize = props.showPageSizeSelection ? this.state.pageSize : text('pageSize', '5');
      // props.onPageSizeChange = this.handlePagination;
      // props.onChange = this.handleChange;
      // props.sortOrder = store.sortOrder;
      // props.sortedColumn = store.sortedColumn;

      return (
        <Table
          actionToolbarChildren={ (context) => {
            return [
              <Button disabled={ context.disabled } key='single-action'>
                            Test Action
              </Button>,
              <MultiActionButton
                text='Actions'
                disabled={ context.disabled }
                key='multi-actions'
              >
                <Button>foo</Button>
                <Button>bar</Button>
                <Button>qux</Button>
              </MultiActionButton>
            ];
          } }
          path='/countries'
          actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
          { ...props }
        />
      );
    }
  }
  return (<Wrapper />);
};

export default StoryWrapper;
