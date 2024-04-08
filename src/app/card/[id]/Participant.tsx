import React, { useState } from 'react';
import styled from 'styled-components';

export const Participant = () =>
  // setParticipants,
  // setNewParticipant,
  // newParticipant,
  // participants
  {
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
    const [isEditDisplayed, setIsEditDisplayed] = useState(false);

    const handleInputChange = (event, field) => {
      setNewParticipant({
        ...newParticipant,
        [field]: event.target.value,
      });
    };

    const handleAddNewParticipant = () => {
      setIsEditDisplayed((prevValue) => !prevValue);
      setParticipants([
        ...participants,
        {
          id: participants.length + 1,
          name: newParticipant.name,
          age: newParticipant.age,
        },
      ]);
      setNewParticipant({
        name: '',
        age: '',
      });
    };

    const handleDeleteParticipant = (id) => {
      setParticipants(
        participants.filter((participant) => participant.id !== id)
      );
    };

    return (
      <div>
        <h2>Selected participants:</h2>
        {participants.map((participant) => (
          <Flex key={participant.id}>
            <img src='#' alt='logo' />
            <div>
              <h3>{participant.name}</h3>
              <p>{participant.age}</p>
            </div>
            <button onClick={() => handleDeleteParticipant(participant.id)}>
              Delete
            </button>
          </Flex>
        ))}
        <div>
          {isEditDisplayed && (
            <div>
              <input
                type='text'
                placeholder='Name'
                value={newParticipant.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
              <input
                type='text'
                placeholder='Age'
                value={newParticipant.age}
                onChange={(e) => handleInputChange(e, 'age')}
              />
            </div>
          )}
          <button onClick={handleAddNewParticipant}>+ Add new</button>
        </div>
      </div>
    );
  };

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
