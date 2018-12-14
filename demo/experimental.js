import { Select, Option } from 'experimental/select';

class Experimental extends React.Component {
  state = {
    selected: [{ id: '1', label: 'Orange' }]
  }

  callback = (ev) => {
    this.setState({ selected: ev.target.value });
  }

  render() {
    return (
      <Select label='Choose Some Colours' onChange={ this.callback } value={ this.state.selected }>
        <Option id='1' label='Orange'>Orange</Option>
        <Option id='2' label='Blue'>Blue</Option>
        <Option id='3' label='Purple'>Purple</Option>
        <Option id='4' label='White'>White</Option>
      </Select>
    );
  }
};

export default Experimental;
