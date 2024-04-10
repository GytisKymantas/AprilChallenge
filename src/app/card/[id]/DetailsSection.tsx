'use client';
import React, { useState } from 'react';
import { Details } from './Details';
import { Navigation } from './Navigation';
import { PaymentModal } from './PaymentModal';
import styled from 'styled-components';

export const DetailsSection = ({ data }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Flex>
      <div>
        <Navigation setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />{' '}
      </div>
      <Container>
        <Details data={data} />
        <PaymentModal data={data} setSidebarOpen={setSidebarOpen} />
      </Container>
    </Flex>
  );
};

const Container = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 20px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;

const Flex = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
