'use client';
import { useStore } from '@/store/store';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Participant } from './Participant';

export const enum RadioInputs {
  MONTHLY = 'monthlyPayment',
  QUARTERLY = 'quarterlyPayment',
}

export const PaymentModal = ({ setSidebarOpen, data }) => {
  const { data: cardData } = data;
  const [selectedPayment, setSelectedPayment] = useState(RadioInputs.MONTHLY);
  const [participants, setParticipants] = useState([
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
  const { updateSelectedPayment, updateParticipants, updateCartItems } =
    useStore();

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
    console.log(selectedPayment, 'paymen');
  };

  console.log(cardData, 'this is data');
  console.log(useStore(), 'store added?!!?!');

  const handleAddToCart = () => {
    updateSelectedPayment(selectedPayment);
    updateParticipants(participants);
    updateCartItems({ id: cardData.id, name: cardData.name });
    console.log(useStore(), 'store added?!!?!');
    setSidebarOpen(true);
  };

  return (
    <Container>
      <Participant
        participants={participants}
        newParticipant={newParticipant}
        setParticipants={setParticipants}
        setNewParticipant={setNewParticipant}
      />
      <h2>Subscription Options</h2>
      <div>
        <input
          type='radio'
          id={RadioInputs.MONTHLY}
          onChange={handlePaymentChange}
          checked={selectedPayment === RadioInputs.MONTHLY}
        />
        <label htmlFor={RadioInputs.MONTHLY}>Monthly payment</label>
        <div>
          <p>
            Charged every month on the 3rd of the month. Initial payment is for
            1 month upfront; subsequent payments are adjusted every month for
            the actual number of lessons.
          </p>
          <span>$64.00/mon</span>
        </div>
      </div>

      <div>
        <input
          type='radio'
          id={RadioInputs.QUARTERLY}
          onChange={handlePaymentChange}
          checked={selectedPayment === RadioInputs.QUARTERLY}
        />
        <label htmlFor={RadioInputs.QUARTERLY}>Quarterly payment</label>
        <div>
          <p>
            Charged every 3 months on the 3rd of the month. Initial payment is
            for 3 months upfront; subsequent payments are adjusted every month
            for the actual number of lessons.
          </p>
          <span>$192.00/3 months</span>
        </div>
      </div>
      <p>
        *note: Monthly price varies depending on the number of scheduled classes
        in that month,
      </p>
      <div>
        <p>Subtotal:</p>
        <p>$64.00</p>
      </div>
      <button
        type='button'
        onClick={handleAddToCart}
        disabled={!participants.length}
      >
        Add to cart
      </button>
    </Container>
  );
};

const Container = styled.div`
  background: gray;
  padding: 20px;
`;
