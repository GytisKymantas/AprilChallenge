'use client';
import React, { useState } from 'react';
import { Details } from './Details';
import { Navigation } from './Navigation';
import { PaymentModal, RadioInputs } from './PaymentModal';
import styled from 'styled-components';

export const DetailsSection = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <div>
        <Navigation
          data={data}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />{' '}
      </div>
      <Container>
        <Details data={data} />
        <PaymentModal data={data} setSidebarOpen={setSidebarOpen} />
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;
