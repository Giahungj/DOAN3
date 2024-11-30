import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (state) => {
    setLoading(state);
  };

  return { loading, setLoadingState };
};

export default useLoading;
