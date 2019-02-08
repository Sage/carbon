import React from 'react';
import { Select, Option } from '__experimental__/components/select'; 

const people = [
  { value: '1', text: 'Brian' },
  { value: '2', text: 'Emma' },
  { value: '3', text: 'Fred' },
  { value: '4', text: 'Martha' },
  { value: '5', text: 'Peter' },
  { value: '6', text: 'Samantha' },
  { value: '7', text: 'Steven' },
  { value: '8', text: 'Victoria' },
  { value: '9', text: 'William' },
  { value: '10', text: 'Yann' }
]

class Sandbox extends React.Component {
  state = {
    people: [],

    country: undefined
  }

  render() {
    return(
      <div style={ { width: '800px', margin: '50px auto' } }>
        <Form>
          <Select
            label='Choose Country'
            value={ this.state.country }
            onChange={ ev => this.setState({ country: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
          >
            <Option text='England' value='1' />
            <Option text='Ireland' value='2' />
            <Option text='Scotland' value='3' />
            <Option text='Wales' value='4' />
          </Select>

          <Select
            label='Choose People'
            value={ this.state.people }
            onChange={ ev => this.setState({ people: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
          >
            { people.filter(person => !this.state.people.find(item => item.value === person.value)).map(person => <Option key={ person.value } { ...person } />) }
          </Select>

          <Select
            label='Choose Country'
            value={ this.state.country }
            onChange={ ev => this.setState({ country: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
            disabled
          >
            <Option text='England' value='1' />
            <Option text='Ireland' value='2' />
            <Option text='Scotland' value='3' />
            <Option text='Wales' value='4' />
          </Select>

          <Select
            label='Choose People'
            value={ this.state.people }
            onChange={ ev => this.setState({ people: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
            disabled
          >
            { people.filter(person => !this.state.people.find(item => item.value === person.value)).map(person => <Option key={ person.value } { ...person } />) }
          </Select>


          <Select
            label='Choose Country'
            value={ this.state.country }
            onChange={ ev => this.setState({ country: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
            readOnly
          >
            <Option text='England' value='1' />
            <Option text='Ireland' value='2' />
            <Option text='Scotland' value='3' />
            <Option text='Wales' value='4' />
          </Select>

          <Select
            label='Choose People'
            value={ this.state.people }
            onChange={ ev => this.setState({ people: ev.target.value }) }
            labelAlign='right'
            labelInline
            placeholder='Please choose'
            validations={ [new PresenceValidation() ] }
            readOnly
          >
            { people.filter(person => !this.state.people.find(item => item.value === person.value)).map(person => <Option key={ person.value } { ...person } />) }
          </Select>
        </Form>
      </div>
    )
  }
};

export default Sandbox;
