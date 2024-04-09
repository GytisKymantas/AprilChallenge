import { fetchCardData } from '@/app/api/fetchData';
import { DetailsSection } from './DetailsSection';

const DynammicPage = async ({ params }: Record<string, string>) => {
  const data = await fetchCardData(params.id);

  return (
    <div>
      <DetailsSection data={data} />
    </div>
  );
};

export default DynammicPage;
