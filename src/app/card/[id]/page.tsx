import { fetchCardData } from '@/app/api/fetchData';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { DetailsSection } from './DetailsSection';

export type ServerProps = {
  params: Params;
  searchParams: ReadonlyURLSearchParams;
};

const DynamicPage = async ({ params }: ServerProps) => {
  const data = await fetchCardData(params.id);

  return (
    <>
      <DetailsSection data={data} />
    </>
  );
};

export default DynamicPage;
