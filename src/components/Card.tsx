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
  const { updateCards, cards } = useStore();

  useEffect(() => {
    updateCards(data);
    console.log(cards, 'cardsxxx');
  }, []);

  const { isTruncated, toggleTruncate, truncatedDescription } =
    useDescriptionTruncation();
  const router = useRouter();
  const description = data.data.activity.description;
  const currentDate = new Date();
  const startDate = new Date(data.start_date);
  const isActivityStarted = startDate <= currentDate;

  const handleSubscribe = (id: string) => {
    router.push(`/card/${id}`);
  };

  return (
    <Container>
      <div>
        {/* <Image
          src={data.image}
          width={55}
          height={55}
          alt='picture of activity'
        /> */}
      </div>
      <div>
        {getAgeGroup(data.data.activity.name)}{' '}
        <p>{data.data.difficulty_type.name} </p>
      </div>
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
        <h2>{data.data.name}</h2>
        <p>
          {isTruncated
            ? truncatedDescription(description) + '...'
            : cleanDescription(description)}
          <button onClick={toggleTruncate}>
            {isTruncated ? 'Read more' : 'Read less'}
          </button>
        </p>
      </div>
      <div>{data.data.provider.address}</div>
      <div>{formatTimeString(data.data.group_days_schedule)}</div>

      <button onClick={() => handleSubscribe(externalKey)}>Subscribe</button>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  background: gray;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
