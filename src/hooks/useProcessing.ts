import { useCallback, useState } from 'react';
import { ProcessingState } from '../types';

export const useProcessing = () => {
  const [state, setState] = useState<ProcessingState>({
    isLoading: false,
    progress: 0,
    error: null
  });

  const startProcessing = useCallback(() => {
    setState({
      isLoading: true,
      progress: 0,
      error: null
    });
  }, []);

  const updateProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress))
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error
    }));
  }, []);

  const completeProcessing = useCallback(() => {
    setState({
      isLoading: false,
      progress: 100,
      error: null
    });
  }, []);

  const resetProcessing = useCallback(() => {
    setState({
      isLoading: false,
      progress: 0,
      error: null
    });
  }, []);

  return {
    ...state,
    startProcessing,
    updateProgress,
    setError,
    completeProcessing,
    resetProcessing
  };
};
