'use client';
import { formatTimeString } from '@/utils/date';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export const Details = ({ data }) => {
  if (!data) {
    return null;
  }
  const cardInformation = data.data;

  return (
    <Container>
      <div>
        <Image
          src='/basketball_desktop.jpg'
          width={400}
          height={300}
          alt='image'
        />
      </div>
      <h2>{cardInformation.activity.name}</h2>
      <GridContainer>
        <GridItem>
          <p>Age group and level</p>
          <p>
            {cardInformation.age_groups.join(', ')} year olds -{' '}
            {cardInformation.difficulty_type.name}
          </p>
        </GridItem>
        <GridItem>
          <p>Location</p>
          <p>{cardInformation.location.name}</p>
          <p>{cardInformation.location.city}</p>
        </GridItem>
        <GridItem>
          <p>Duration</p>
          <p>September 30th</p>
        </GridItem>
        <GridItem>
          <p>Available spots</p>
          <p>
            {' '}
            {Math.max(
              cardInformation.capacity - cardInformation.active_attendees,
              0
            )}
            spots left
          </p>
        </GridItem>
        <GridItem>
          <p>Schedule</p>
          <p>{formatTimeString(cardInformation.group_days_schedule)}</p>
        </GridItem>
        <GridItem>
          <p>Contacts</p>
          <p>
            {cardInformation.provider.phone} | {cardInformation.provider.email}{' '}
          </p>
        </GridItem>
      </GridContainer>
      {/* <PaymentModal /> */}
    </Container>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
`;

const GridItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
