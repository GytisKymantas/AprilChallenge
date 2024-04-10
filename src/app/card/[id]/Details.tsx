'use client';
import { formatDate, formatTimeString } from '@/utils/date';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export const Details = ({ data }: any) => {
  const cardInformation = data.data;
  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src='/basketball_desktop.jpg'
          width={1000}
          height={400}
          alt='image'
        />
      </ImageContainer>
      <Header>{cardInformation.activity.name}</Header>
      <GridContainer>
        <GridItem>
          <p>
            <u>Age group and level</u>
          </p>
          <p>
            {cardInformation.age_groups.join(', ')} year olds -{' '}
            {cardInformation.difficulty_type.name}
          </p>
        </GridItem>
        <GridItem>
          <p>
            <u>Location</u>
          </p>
          <p>{cardInformation.location.name}</p>
          <p>{cardInformation.location.city}</p>
        </GridItem>
        <GridItem>
          <p>
            <u>Duration</u>
          </p>
          <p>{formatDate(cardInformation.start_date)}</p>
        </GridItem>
        <GridItem>
          <p>
            <u>Available spots</u>
          </p>
          <p>
            {' '}
            {Math.max(
              cardInformation.capacity - cardInformation.active_attendees,
              0
            )}{' '}
            spots left
          </p>
        </GridItem>
        <GridItem>
          <p>
            <u>Schedule</u>
          </p>
          <p>{formatTimeString(cardInformation.group_days_schedule)}</p>
        </GridItem>
        <GridItem>
          <p>
            <u>Contacts</u>
          </p>
          <p>
            {cardInformation.provider.phone} | {cardInformation.provider.email}{' '}
          </p>
        </GridItem>
      </GridContainer>
    </Container>
  );
};

const StyledImage = styled(Image)`
  width: 100%; /* Make sure the image fills its container */
  height: auto; /* Maintain aspect ratio */

  /* Media query for smaller screens */
  @media screen and (max-width: 768px) {
    width: 100%; /* Adjust width for smaller screens */
    height: auto; /* Maintain aspect ratio */
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ImageContainer = styled.div`
  margin: 0 auto;
`;

const GridItem = styled.div`
  border: 1px solid #ccc;

  padding: 10px;

  p {
    font-size: 12px;
    font-weight: 600;
    text-align: center;
  }
`;

export const Header = styled.h2`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
