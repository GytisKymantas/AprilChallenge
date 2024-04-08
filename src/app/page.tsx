import { Card } from '@/components/Card';
import { useStore } from '@/store/store';
import { fetchCardData, fetchCardDataTwo } from './api/fetchData';

export default async function Home() {
  const datatwo = await fetchCardDataTwo();
  console.log(datatwo, 'in bam home data');

  // const data = await fetchCardData();

  // const externalKey = datatwo.data[0].external_key;
  // const dataOne = await fetchCardData(bam);
  // console.log(dataOne, 'this is data');

  return (
    <main>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          data={{ data: datatwo.data[index] }}
          externalKey={datatwo.data[index].external_key}
        />
      ))}
    </main>
  );
}

// const Flex = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
