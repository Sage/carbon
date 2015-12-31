import React from 'react';
import Devices from './devices';

//Need to stub window & navigator objects
xdescribe('devices', () => {
  describe('isTouchDevice', () => {

    describe('When it is a touch device', () => {

      describe('when browsing in Chrome or Firefox', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice()).toBeTruthy();
        });
      });

      describe('when browsing in Safari', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice()).toBeTruthy();
        });
      });

      describe('when browsing in Internet Explorer', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice()).toBeTruthy();
        });
      });
    });

    describe('when it is not a touch device', () => {
      it('returns false', () => {
        expect(Devices.isTouchDevice()).toBeFalsy();
      });
    });
  });
});
