import React from 'react';
import MD5 from 'crypto-js/md5';
import TestRenderer from 'react-test-renderer';
import PortraitGravatar from './portrait-gravatar.component';
import mediumTheme from '../../style/themes/medium';

describe('PortraitGravatar', () => {
  describe('gravatarSrc', () => {
    it('returns the correct Gravatar URL', () => {
      const email = 'example@example.com';
      const rendered = TestRenderer.create(
        <PortraitGravatar
          theme={ mediumTheme }
          gravatarEmail={ email }
          size='medium'
        />
      );
      const src = rendered.toTree().instance.gravatarSrc();
      const base = 'https://www.gravatar.com/avatar/';
      const hash = MD5(email);
      const dimensions = 56;
      expect(src).toEqual(`${base}${hash}?s=${dimensions}&d=blank`);
    });
  });
});
