import React, { useState } from 'react';
import styled from 'styled-components';

interface InputProps {
  onChange: (e: string) => void;
  value: string;
  placeholder: string;
  id: string;
  type: 'email' | 'password';
}

export const Input = ({
  onChange,
  id,
  type,
  placeholder,
  value,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <input
        type={showPassword ? 'email' : 'password'}
        value={value}
        id={id}
        required
        maxLength={50}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {type === 'password' && (
        <ToggleButton onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      )}
    </div>
  );
};

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  margin-left: 5px;
`;
