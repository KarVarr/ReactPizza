import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='108' y='62' rx='0' ry='0' width='1' height='0' />
    <rect x='0' y='261' rx='6' ry='6' width='280' height='28' />
    <rect x='75' y='145' rx='0' ry='0' width='0' height='1' />
    <circle cx='136' cy='125' r='125' />
    <rect x='0' y='415' rx='6' ry='6' width='95' height='45' />
    <rect x='130' y='415' rx='20' ry='20' width='150' height='45' />
    <rect x='0' y='310' rx='6' ry='6' width='280' height='88' />
  </ContentLoader>
);

export default Skeleton;
