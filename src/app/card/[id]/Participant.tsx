import { useStore } from '@/store/store';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Header } from './Details';
import { Separation } from './PaymentModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { StorageKeys, TParticipantSchema } from '@/utils/types';
import { ParticipantSchema } from '@/utils/types';
import { StyledInput } from '@/app/login/page';

export type TParticipant = {
  id?: number;
  name: string;
  age: string;
};

interface ParticipantProps {
  setParticipants: React.Dispatch<React.SetStateAction<TParticipant[]>>;
  setNewParticipant: React.Dispatch<React.SetStateAction<TParticipant>>;
  participants: TParticipant[];
  newParticipant: TParticipant;
}

export const Participant = ({
  setParticipants,
  setNewParticipant,
  newParticipant,
  participants,
}: ParticipantProps) => {
  const { updateParticipants } = useStore();
  const [isEditDisplayed, setIsEditDisplayed] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TParticipantSchema>({
    resolver: zodResolver(ParticipantSchema),
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewParticipant({
      ...newParticipant,
      [field]: event?.target?.value,
    });
  };

  const handleAddNewParticipant = () => {
    setIsEditDisplayed(true);
    setParticipants([
      ...participants,
      {
        id: participants.length + 1,
        name: newParticipant.name,
        age: newParticipant.age,
      },
    ]);

    updateParticipants(participants);
    setNewParticipant({
      name: '',
      age: '',
    });
    reset();
  };

  const handleDeleteParticipant = (id: number) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
    updateParticipants(participants);
  };

  return (
    <div>
      <Header>Selected participants:</Header>
      <Separation />
      {participants.map((participant, id) => (
        <Flex key={participant.id}>
          <p style={{ width: '60px' }}>User {id + 1}</p>
          <div style={{ width: '150px' }}>
            <UserTitle>Name:{participant.name}</UserTitle>
            <StyledSubtitle>age:{participant.age}</StyledSubtitle>
          </div>
          <DeleteButton onClick={() => handleDeleteParticipant(id)}>
            x
          </DeleteButton>
        </Flex>
      ))}

      <InputOuterContainer>
        {isEditDisplayed && (
          <form onSubmit={handleSubmit(handleAddNewParticipant)}>
            <InputInnerContainer>
              <>
                <StyledInput
                  {...register(StorageKeys.name)}
                  type='text'
                  placeholder={StorageKeys.name}
                  hasError={!!errors?.name?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, StorageKeys.name)
                  }
                />
                {errors?.name?.message && (
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                )}
              </>
              <>
                <StyledInput
                  {...register(StorageKeys.age)}
                  type='number'
                  placeholder={StorageKeys.age}
                  hasError={!!errors?.age?.message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, StorageKeys.age)
                  }
                />
                {errors?.age?.message && (
                  <ErrorMessage>{errors.age.message}</ErrorMessage>
                )}
              </>

              <button type='submit'>+</button>
            </InputInnerContainer>
          </form>
        )}
        <Button onClick={() => setIsEditDisplayed((prevValue) => !prevValue)}>
          + Add new
        </Button>
      </InputOuterContainer>
    </div>
  );
};

const InputOuterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
`;

const InputInnerContainer = styled(InputOuterContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.span`
  color: crimson;
`;
const Button = styled.button`
  display: flex;
  justify-content: flex-end;
  border: none;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 15px;
  margin: 10px 0;
`;

const DeleteButton = styled(Button)`
  padding: 4px 6px;
`;
const UserTitle = styled.h3`
  margin: 0;
`;
const StyledSubtitle = styled.p`
  margin: 0;
`;
