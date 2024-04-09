'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { formatDate, formatTimeString } from '@/utils/date';
import { cleanDescription, getAgeGroup } from '@/utils/general';
import useDescriptionTruncation from '@/hooks/use-truncate';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/store';

export const Card = ({ data, externalKey, id = 1 }) => {
  if (!data) {
    return null;
  }

  const { updateCards } = useStore();
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    updateCards(data);
  }, []);

  const { isTruncated, toggleTruncate, truncatedDescription } =
    useDescriptionTruncation();
  const router = useRouter();
  const description = data.data.activity.description;
  const currentDate = new Date();
  const startDate = new Date(data.start_date);
  const isActivityStarted = startDate <= currentDate;

  const handleSubscribe = (externalKey: string) => {
    router.push(`/card/${externalKey}`);
  };

  const testHandler = (id) => {
    {
      setExpandedCardId(id);
      toggleTruncate();
    }
  };
  const isCurrentCardExpanded = expandedCardId === id;

  return (
    <OuterContainer
      style={{ height: isCurrentCardExpanded ? '100%' : '540px' }}
    >
      <ImageContainer>
        <Image
          src='/basketball_mobile.jpg'
          width={300}
          height={200}
          alt='picture of activity'
        />
        <AgeGroupContainer>
          <AgeGroup>{getAgeGroup(data.data.activity.name)} </AgeGroup>
          <AgeGroup>{data.data.difficulty_type.name}</AgeGroup>
        </AgeGroupContainer>
      </ImageContainer>
      <InnerContainer>
        <Flex>
          <p>
            {Math.max(data.data.capacity - data.data.active_attendees, 0)} spots
            left
          </p>
          <p>
            {isActivityStarted
              ? 'Already started'
              : formatDate(data.data.start_date)}
          </p>
        </Flex>
        <div>
          <h2>{data.data.name} </h2>
          <p>
            {isTruncated
              ? truncatedDescription(description) + '...'
              : cleanDescription(description)}
            <ReadMoreButton onClick={() => testHandler(id)}>
              {isTruncated ? 'Read more' : 'Read less'}
            </ReadMoreButton>
          </p>
        </div>
        <div>{data.data.provider.address}</div>
        <div style={{ height: '18.5px' }}>
          {formatTimeString(data.data.group_days_schedule)}{' '}
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
  padding: 10px 20px 20px 20px;
`;

const OuterContainer = styled.div`
  width: 300px;
  background: gray;
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
`;
