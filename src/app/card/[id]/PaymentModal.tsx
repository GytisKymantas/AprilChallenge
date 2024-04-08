'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Participant } from './Participant';

export const PaymentModal = () => {
  const [selectedPayment, setSelectedPayment] = useState('monthlyPayment');

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  return (
    <Container>
      <Participant />
      <h2>Subscription Options</h2>
      <div>
        <input
          type='radio'
          id='monthlyPayment'
          onChange={handlePaymentChange}
          checked={selectedPayment === 'monthlyPayment'}
        />
        <label htmlFor='monthlyPayment'>Monthly payment</label>
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
          id='quarterlyPayment'
          onChange={handlePaymentChange}
          checked={selectedPayment === 'quarterlyPayment'}
        />
        <label htmlFor='quarterlyPayment'>Quarterly payment</label>
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
      <button>Add to cart</button>
    </Container>
  );
};

const Container = styled.div`
  background: gray;
  padding: 20px;
`;
