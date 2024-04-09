'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { pathStringToObject } from '@/utils/general';
import styled from 'styled-components';
import Link from 'next/link';
import { useStore } from '@/store/store';
import { formatTimeString } from '@/utils/date';
import { RadioInputs } from './PaymentModal';
import { useShallow } from 'zustand/react/shallow';

export const Navigation = ({ data, sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameObject = pathStringToObject(pathname);

  const { selectedPayment, participants, cartItems } = useStore(
    useShallow((state) => ({
      selectedPayment: state.selectedPayment,
      participants: state.participants,
      cartItems: state.cartItems,
    }))
  );
  const cardInformation = data.data;
  console.log(cardInformation, 'data');
  console.log(participants, 'participants inside');
  console.log(selectedPayment, 'selectedPayment inside');
  console.log(useStore(), 'useStoreuseStoreuseStoreuseStore');
  const previousPath = Object.keys(pathnameObject);
  const currentPath = Object.values(pathnameObject);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const Sidebar = ({ sidebarOpen, onClose }) => {
    return (
      <SidebarContainer sidebarOpen={sidebarOpen}>
        {selectedPayment ? (
          <>
            <h2>My cart 1</h2>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <SidebarContent>
              {/* Add your sidebar content here */}
              <h2>{cardInformation.activity.name}</h2>
              <p>This is the content of the sidebar.</p>

              <p>
                Adress: {cardInformation?.location.name}{' '}
                {cardInformation.location.city}
              </p>
              <p>
                Participant:
                {participants.map((obj) => `${obj.name}`)}{' '}
              </p>
              <p>Duration: {cardInformation.activity.name}</p>
              <p>
                Schedule:{' '}
                {formatTimeString(cardInformation.group_days_schedule)}
              </p>
              <p>Level: {cardInformation.difficulty_type.name}</p>
              <p>
                Age group: {cardInformation.age_groups.join(', ')} year olds -{' '}
              </p>
              <p>Price: {cardInformation.activity.name}</p>

              <p>
                Total{' '}
                {selectedPayment === RadioInputs.MONTHLY
                  ? '$64.00 month'
                  : '$192.00/3 months'}
              </p>
              <button onClick={() => router.push('/success')}>Checkout</button>
            </SidebarContent>
          </>
        ) : (
          <>
            <h2>My cart </h2>
          </>
        )}
      </SidebarContainer>
    );
  };

  return (
    <Container>
      <Flex>
        <div>
          <button onClick={() => router.back()}>go back</button>
          <span>
            <Link href={`/`}>{previousPath}</Link>/{' '}
            <Link href={`/${currentPath}`}>{currentPath}</Link>
          </span>
        </div>
        <span onClick={toggleSidebar}>Cart {cartItems?.length} </span>
      </Flex>
      {sidebarOpen && (
        <Sidebar sidebarOpen={sidebarOpen} onClose={toggleSidebar} />
      )}
    </Container>
  );
};

const Container = styled.div`
  background: azure;
  padding: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ sidebarOpen }) => (sidebarOpen ? '0' : '-300px')};
  width: 300px;
  height: 100vh;
  background-color: #fff;
  box-shadow: ${({ sidebarOpen }) =>
    sidebarOpen ? '0px 0px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarContent = styled.div`
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
