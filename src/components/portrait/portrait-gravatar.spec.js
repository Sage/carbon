import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import MD5 from 'crypto-js/md5';
import PortraitGravatar from './portrait-gravatar.component';

describe('PortraitGravatar', () => {
  describe('gravatarSrc', () => {
    it('returns the correct Gravatar URL', () => {
      const email = 'example@example.com';
      const dimensions = 30;
      const instance = ReactTestUtils.renderIntoDocument(
        <PortraitGravatar gravatarEmail={ email } dimensions={ dimensions } />
      );
      const src = instance.gravatarSrc();
      const base = 'https://www.gravatar.com/avatar/';
      const hash = MD5(email);
      expect(src).toEqual(`${base}${hash}?s=${dimensions}&d=blank`);
    });
  });
});
