import { useState } from 'react';

const useDescriptionTruncation = (initialState = true, maxLength = 100) => {
  const [isTruncated, setIsTruncated] = useState(initialState);

  const truncatedDescription = (description:string) => description.slice(0, maxLength).replace(/<[^>]*>?/gm, '');

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return { isTruncated, toggleTruncate, truncatedDescription };
};

export default useDescriptionTruncation;