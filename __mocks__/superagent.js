'use strict';

// mock for superagent - __mocks__/superagent.js

var mockDelay;
var mockError;
var mockResponse = {
  status() {
    return 200;
  },
  ok() {
    return true;
  },
  body: {
    walla: true
  },
  get: jest.fn(),
  toError: jest.fn()
};

const mockEvents = [];

var Request = (method, url) => {
  if (method && url) {
    Request[method](url);
  }
  return Request;
}

Request.post = jest.fn().mockReturnThis();
Request.get = jest.fn().mockReturnThis();
Request.send = jest.fn().mockReturnThis();
Request.query = jest.fn().mockReturnThis();
Request.field = () => {
  return Request;
};
Request.set = () => {
  return Request;
};
Request.del = () => {
  return Request;
};
Request.accept = () => {
  return Request;
};
Request.timeout = () => {
  return Request;
};
Request.del = () => {
  return Request;
};
Request.put = () => {
  return Request;
};
Request.type = () => {
  return Request;
};
Request.on = (eventName, callback) => {
  mockEvents[eventName] = callback;
  return Request;
};
Request.end = jest.fn().mockImplementation((callback) => {
  if (mockDelay) {
    this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);

    return;
  }

  callback(mockError, mockResponse);
  return Request;
});

//expose helper methods for tests to set
Request.__setMockDelay = (boolValue) => {
  mockDelay = boolValue;
};
Request.__setMockResponse = (mockRes) => {
  mockResponse = mockRes;
};
Request.__setMockError = (mockErr) => {
  mockError = mockErr;
};
Request.__simulate = (eventName, eventObject) => {
  mockEvents[eventName](eventObject);
};

module.exports = Request;
