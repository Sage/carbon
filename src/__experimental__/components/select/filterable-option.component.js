import Option from './option.component';
import { WithFilterable } from './../filterable';

const FilterableOption = WithFilterable(Option);
Option.displayName = 'FilterableOption';

export default FilterableOption;
