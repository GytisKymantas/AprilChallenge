import { fetchCardData, fetchCardDataTwo } from '@/app/api/fetchData';
import { useStore } from '@/store/store';
import React from 'react';
import { Details } from './Details';
import { Navigation } from './Navigation';

const Bam = async ({ params }) => {
  console.log(params, 'bam params');
  const data = await fetchCardData(params.id);
  console.log(data, 'received from BAM');
  return (
    <div>
      <div>
        <Navigation />{' '}
      </div>
      <Details data={data} />
    </div>
  );
};

export default Bam;
