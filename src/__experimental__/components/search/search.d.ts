import * as React from 'react';
import { InputProps } from '../input';

export interface SearchProps extends InputProps {
  defaultValue?: string;
  value?: string;
  id?: string;
  name?: string;
  onChange?: () => void;
}
declare const Search: React.ComponentType<SearchProps>;
export default Search;
