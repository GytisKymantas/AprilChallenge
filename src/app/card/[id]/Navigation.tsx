'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { usePathname } from 'next/navigation';
import { findKeyByValue, pathStringToObject } from '@/utils/general';
import styled from 'styled-components';
import Link from 'next/link';
import { useStore } from '@/store/store';
import { formatTimeString } from '@/utils/date';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { Separation } from './PaymentModal';
import { Routes } from '@/utils/types';
import { PageEndpoints } from '@/utils/constants';

interface NavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}
export const Navigation = ({
  sidebarOpen,
  setSidebarOpen,
}: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameObject = pathStringToObject(pathname);
  const previousPath = Object.keys(pathnameObject);
  const cardNumber = findKeyByValue(PageEndpoints, pathnameObject.card);

  const { selectedPayment, participants, cartItems } = useStore(
    useShallow((state) => ({
      selectedPayment: state.selectedPayment,
      participants: state.participants,
      cartItems: state.cartItems,
    }))
  );

  const Sidebar = () => {
    return (
      <SidebarContainer sidebarOpen={sidebarOpen}>
        <h2>My cart {cartItems?.length}</h2>
        {selectedPayment ? (
          <>
            {cartItems.map((item: any) => {
              const cartItem = item;
              return (
                <div key={cartItem?.id}>
                  <ImageContainer>
                    <Image
                      src='/basketball_mobile.jpg'
                      width={300}
                      height={200}
                      alt='basketball picture'
                    />
                  </ImageContainer>
                  <CloseButton onClick={() => setSidebarOpen(false)}>
                    Close
                  </CloseButton>
                  <SidebarContent>
                    <h2>{cartItem?.activity.name}</h2>
                    <p>This is the content of the sidebar.</p>

                    <p>
                      Adress: {cartItem?.location.name} {cartItem.location.city}
                    </p>
                    <p>
                      Participants:
                      {participants.map((obj, idx) => (
                        <div key={idx}>
                          {obj.name} - {obj.age} years old
                        </div>
                      ))}{' '}
                    </p>
                    <p>Duration: {cartItem.activity.name}</p>
                    <p>
                      Schedule: {formatTimeString(cartItem.group_days_schedule)}
                    </p>
                    <p>Level: {cartItem.difficulty_type.name}</p>
                    <p>
                      Age group: {cartItem.age_groups.join(', ')} - year olds{' '}
                    </p>
                    <p>Price: ${cartItem.activityPrice} </p>
                  </SidebarContent>
                  <Separation />
                </div>
              );
            })}
            <PriceContainer>
              <span>
                <b>TOTAL: </b>
              </span>{' '}
              <span>
                $
                {cartItems.reduce(
                  (
                    accumulator: number,
                    currentValue: { activityPrice: number }
                  ) => {
                    return accumulator + currentValue.activityPrice;
                  },
                  0
                )}{' '}
              </span>
            </PriceContainer>
            <ButtonPurple onClick={() => router.push(Routes.Success)}>
              Checkout
            </ButtonPurple>
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
        <Flex>
          <Button onClick={() => router.back()}> Back</Button>
          <span>
            <LinkStyled href={`/`}>{previousPath}</LinkStyled> /{' '}
            <LinkStyled href='#'>{cardNumber}</LinkStyled>
          </span>
        </Flex>
        <CartLogo onClick={() => setSidebarOpen(!sidebarOpen)}>
          Cart {cartItems?.length}{' '}
        </CartLogo>
      </Flex>
      {sidebarOpen && <Sidebar />}
    </Container>
  );
};

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: gray;
`;
const ImageContainer = styled.div`
  position: relative;
`;

const CartLogo = styled.span`
  background: gray;
  padding: 10px;
  border-radius: 100%;
`;
const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 20px;
  gap: 10px;
`;
const Button = styled.button`
  border: none;
  background: none;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
`;

const ButtonPurple = styled(Button)`
  background: purple;
  color: white;
  padding: 10px 15px;
  margin-top: 20px;
  width: 100%;
`;

const Container = styled.div`
  padding: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const SidebarContainer = styled.div<{ sidebarOpen?: boolean }>`
  padding: 10px;
  position: fixed;
  top: 0;
  right: ${({ sidebarOpen }) => (sidebarOpen ? '0' : '-300px')};
  width: 300px;
  background-color: #fff;
  box-shadow: ${({ sidebarOpen }) =>
    sidebarOpen ? '0px 0px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  overflow: scroll;
  max-height: ${({ sidebarOpen }) => (sidebarOpen ? '100vh' : '0')};
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
