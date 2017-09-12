/**
 * @jest-environment node
 */

import Browser from '../browser';

/* global test */

describe('Browser', () => {
  describe('getWindow()', () => {
    describe('when window is not defined', () => {
      it('returns an empty object', () => {
        expect(Browser.getWindow()).toBeUndefined();
      });
    });
  });
});
