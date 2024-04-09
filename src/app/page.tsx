import { Card } from '@/components/Card';
import { fetchCardDataTwo } from './api/fetchData';
// import styled from 'styled-components';

export default async function Home() {
  const datatwo = await fetchCardDataTwo();

  return (
    <main>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            data={{ data: datatwo.data[index] }}
            externalKey={datatwo.data[index].external_key}
            id={index}
          />
        ))}
      </div>
    </main>
  );
}

// const Main = styled.main`
//   background: red;
// `;
