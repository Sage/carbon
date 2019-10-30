import createEvent from './index';


const mockInputTarget = {
  id: 'username_id',
  name: 'username',
  value: 'CarbonUser'
};

class Event {
  constructor(target = mockInputTarget) {
    this.target = target;
  }
}

it('throws when no event is passed', () => {
  expect(() => {
    createEvent();
  }).toThrow('Unable to extend event because event does not exist');
});

it('throws when no overrides ar passed', () => {
  expect(() => {
    createEvent(new Event());
  }).toThrow('Unable to extend event because no overrides were provided');
});

describe('extends the base object', () => {
  let event;
  const overrides = {
    name: 'Override Name',
    id: 'Override Id',
    value: {
      rawValue: 'Override Value',
      formattedValue: 'Override-Value'
    }
  };
  beforeEach(() => {
    event = createEvent(new Event(), overrides);
  });

  it.each(['name', 'id', 'value'])('overrides event.target.%s', (prop) => {
    expect(event.target[prop]).toBe(overrides[prop]);
  });
});

describe('default props', () => {
  it('defaults name to nativeEvent.target', () => {
    const event = createEvent(new Event(), {
      value: 'foo'
    });
    expect(event.target.name).toBe(mockInputTarget.name);
  });

  it('defaults id to nativeEvent.target', () => {
    const event = createEvent(new Event(), {
      value: 'foo'
    });
    expect(event.target.id).toBe(mockInputTarget.id);
  });

  it('defaults value to nativeEvent.target', () => {
    const event = createEvent(new Event(), {
      name: 'foo'
    });
    expect(event.target.value).toBe(mockInputTarget.value);
  });

  it('only defaults name if nativeEvent.target has the same prop', () => {
    const event = createEvent(new Event({}), {
      value: 'foo'
    });
    expect(Object.prototype.hasOwnProperty.call(event.target, 'name')).toBe(false);
  });

  it('only defaults id if nativeEvent.target has the same prop', () => {
    const event = createEvent(new Event({}), {
      value: 'foo'
    });
    expect(Object.prototype.hasOwnProperty.call(event.target, 'id')).toBe(false);
  });

  it('only defaults value if nativeEvent.target has the same prop', () => {
    const event = createEvent(new Event({}), {
      name: 'foo'
    });
    expect(Object.prototype.hasOwnProperty.call(event.target, 'value')).toBe(false);
  });
});
