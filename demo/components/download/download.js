import React from 'react';

// Carbon
import Icon from 'components/icon';
import Link from 'components/link';
import './download.scss';

/**
 * Page section loads a download with label, link and a download icon
 *
 * @param {object} props.href - where the down load lives
 * @param {object} props.label - text for the download
 * @param {object} props.size - file size
 * @param {object} props.type - file type
 * @return {Download}
 */
export default props => (
  <Link href={ props.href }>
    <div className='demo-download'>
      <Icon type='download' />
      <div className='demo-download__details'>
        <span className='demo-download__label'>{ props.label }</span>
        <span className='demo-download__details'>{ props.size } ({ props.type })</span>
      </div>
    </div>
  </Link>
);
