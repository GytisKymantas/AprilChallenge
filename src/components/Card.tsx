'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { formatDate, formatTimeString } from '@/utils/date';
import { cleanDescription } from '@/utils/general';
import useDescriptionTruncation from '@/hooks/use-truncate';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';

interface CardProps {
  data: any;
  externalKey: string;
}
export const Card = ({ data, externalKey }: CardProps) => {
  const router = useRouter();
  const { updateCards } = useStore();
  const { isTruncated, toggleTruncate, truncatedDescription } =
    useDescriptionTruncation();

  const cardInformation = data.data;
  const description = cardInformation.activity.description;

  const currentDate = new Date();
  const startDate = new Date(data.start_date);
  const isActivityStarted = startDate <= currentDate;

  const handleSubscribe = (externalKey: string) => {
    router.push(`/card/${externalKey}`);
  };

  useEffect(() => {
    updateCards(data);
  }, []);

  return (
    <OuterContainer>
      <ImageContainer>
        <RoundedImage
          src='/basketball_mobile.jpg'
          width={300}
          height={200}
          alt='picture of activity'
        />
        <AgeGroupContainer>
          <AgeGroup>
            {cardInformation.age_groups.join(', ')} years old{' '}
          </AgeGroup>
          <AgeGroup>{cardInformation.difficulty_type.name}</AgeGroup>
        </AgeGroupContainer>
      </ImageContainer>
      <InnerContainer>
        <Flex>
          <p>
            {Math.max(
              cardInformation.capacity - cardInformation.active_attendees,
              0
            )}{' '}
            spots left
          </p>
          <p>
            {isActivityStarted
              ? 'Already started'
              : formatDate(cardInformation.start_date)}
          </p>
        </Flex>
        <div>
          <h2>{cardInformation.name} </h2>
          <p>
            {isTruncated
              ? truncatedDescription(description) + '...'
              : cleanDescription(description)}
            <ReadMoreButton onClick={toggleTruncate}>
              {isTruncated ? 'Read more' : 'Read less'}
            </ReadMoreButton>
          </p>
        </div>
        <div>{cardInformation.provider.address}</div>
        <div style={{ height: '18.5px' }}>
          {formatTimeString(cardInformation.group_days_schedule)}{' '}
        </div>
      </InnerContainer>
      <Button onClick={() => handleSubscribe(externalKey)}>Subscribe</Button>
    </OuterContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
`;

const AgeGroupContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
`;

export const RoundedImage = styled(Image)`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: purple;
  font-weight: 700;
  cursor: pointer;
`;

const AgeGroup = styled.div`
  color: White;
  background-color: black;
  padding: 10px 0;
  text-align: center;
  opacity: 0.6;
  margin-bottom: 10px;
  border-radius: 100px;
  width: 120px;
  font-size: 14px;
  margin-left: auto;
`;
const InnerContainer = styled.div`
  padding: 10px 20px 10px 20px;
`;

const OuterContainer = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow */
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  padding: 8px 5px;
  background: purple;
  color: white;
  font-weight: 700;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;
