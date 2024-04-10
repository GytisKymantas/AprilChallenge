'use client';
import { useStore } from '@/store/store';
import { PaymentTypes } from '@/utils/types';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Header } from './Details';
import { Participant, TParticipant } from './Participant';

interface PaymentModalProps {
  data: any;
  setSidebarOpen: (value: Boolean) => void;
}
export const PaymentModal = ({ setSidebarOpen, data }: PaymentModalProps) => {
  const { data: cardData } = data;
  const [selectedPayment, setSelectedPayment] = useState<string>(
    PaymentTypes.MONTHLY
  );
  const [participants, setParticipants] = useState<TParticipant[]>([
    {
      id: 1,
      name: 'John Doe',
      age: '8',
    },
  ]);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    age: '',
  });
  const {
    updateSelectedPayment,
    updateParticipants,
    updateCartItems,
    cartItems,
  } = useStore();

  const handleCartUpdating = () => {
    const _cardData = [
      {
        ...cardData,
        activityPrice: selectedPayment === PaymentTypes.MONTHLY ? 194 : 64,
      },
    ] as any;

    const isIdPresentInBam = _cardData.some((item: any) =>
      cartItems.some((_cardDataItem: any) => _cardDataItem.id === item.id)
    );

    if (!isIdPresentInBam) {
      updateCartItems({
        ...cardData,
        activityPrice: selectedPayment === PaymentTypes.MONTHLY ? 194 : 64,
      });
    }
  };

  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.id);
  };

  const handleAddToCart = () => {
    updateSelectedPayment(selectedPayment);
    updateParticipants(participants);
    handleCartUpdating();
    setSidebarOpen(true);
  };

  return (
    <div>
      <Container>
        <Participant
          participants={participants}
          newParticipant={newParticipant}
          setParticipants={setParticipants}
          setNewParticipant={setNewParticipant}
        />
        <Separation />
        <Header>Payment Options</Header>
        <Flex>
          <input
            type='radio'
            id={PaymentTypes.MONTHLY}
            onChange={handlePaymentChange}
            checked={selectedPayment === PaymentTypes.MONTHLY}
          />
          <div>
            <label htmlFor={PaymentTypes.MONTHLY}>Monthly payment</label>
            <p>
              Charged every month on the 3rd of the month. Initial payment is
              for 1 month upfront; subsequent payments are adjusted every month
              for the actual number of lessons.
            </p>
          </div>
          <span>$64.00 / mon</span>
        </Flex>
        <Separation />
        <Flex>
          <input
            type='radio'
            id={PaymentTypes.QUARTERLY}
            onChange={handlePaymentChange}
            checked={selectedPayment === PaymentTypes.QUARTERLY}
          />
          <div>
            <label htmlFor={PaymentTypes.QUARTERLY}>Quarterly payment</label>
            <p>
              Charged every 3 months on the 3rd of the month. Initial payment is
              for 3 months upfront; subsequent payments are adjusted every month
              for the actual number of lessons.
            </p>
          </div>
          <span>$192.00 / 3 months</span>
        </Flex>
        <Separation />
        <SubtotalContainer>
          <p>SUBTOTAL:</p>
          <span>
            {selectedPayment === PaymentTypes.QUARTERLY ? '$192.00' : '$64.00'}
          </span>
        </SubtotalContainer>
      </Container>
      <Button
        type='button'
        onClick={handleAddToCart}
        disabled={!participants.length}
      >
        Add to cart
      </Button>
    </div>
  );
};

export const Separation = styled.div`
  content: '';
  border-bottom: 2px solid gray;
  height: 1px;
  width: 100%;
  margin: 10px 0;
`;
const Container = styled.div`
  border: 1px solid black;

  label {
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: underline;
  }

  p {
    max-width: 350px;
    margin-top: 5px;
  }

  span {
    color: gray;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 20px;
`;

const SubtotalContainer = styled(Flex)`
  justify-content: Space-between;
  padding: 0 20px;
`;

const Button = styled.button`
  width: 100%;
  background: purple;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
  padding: 20px 15px;
`;
