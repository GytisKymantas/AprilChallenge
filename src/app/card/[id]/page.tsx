import { fetchCardData } from '@/app/api/fetchData';
import { DetailsSection } from './DetailsSection';

const Bam = async ({ params }) => {
  const data = await fetchCardData(params.id);

  return (
    <div>
      <DetailsSection data={data} />
    </div>
  );
};

export default Bam;
