import { useCallback, useState } from 'react';
import { ErrorState, LoadingState } from '../types';

/**
 * Custom hook for managing async operations with loading and error states
 * Provides consistent state management across components
 */
export function useAsyncOperation<T = any>() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: undefined,
    progress: undefined,
  });

  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: undefined,
    code: undefined,
    details: undefined,
  });

  const [data, setData] = useState<T | null>(null);

  /**
   * Execute an async operation with automatic state management
   */
  const execute = useCallback(async <R = T>(
    operation: () => Promise<R>,
    options?: {
      loadingMessage?: string;
      successMessage?: string;
      onSuccess?: (result: R) => void;
      onError?: (error: Error) => void;
    }
  ): Promise<R | null> => {
    try {
      // Start loading
      setLoadingState({
        isLoading: true,
        message: options?.loadingMessage,
        progress: undefined,
      });

      // Clear previous errors
      setErrorState({
        hasError: false,
        message: undefined,
        code: undefined,
        details: undefined,
      });

      // Execute the operation
      const result = await operation();

      // Update data and success state
      setData(result as T);
      setLoadingState({
        isLoading: false,
        message: options?.successMessage,
        progress: 100,
      });

      // Call success callback
      options?.onSuccess?.(result);

      return result;
    } catch (error) {
      const errorInstance = error instanceof Error ? error : new Error(String(error));

      // Set error state
      setErrorState({
        hasError: true,
        message: errorInstance.message,
        code: 'OPERATION_FAILED',
        details: { originalError: error },
      });

      // Clear loading state
      setLoadingState({
        isLoading: false,
        message: undefined,
        progress: undefined,
      });

      // Call error callback
      options?.onError?.(errorInstance);

      return null;
    }
  }, []);

  /**
   * Update loading progress
   */
  const updateProgress = useCallback((progress: number, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      progress,
      message: message || prev.message,
    }));
  }, []);

  /**
   * Clear all states
   */
  const reset = useCallback(() => {
    setLoadingState({
      isLoading: false,
      message: undefined,
      progress: undefined,
    });
    setErrorState({
      hasError: false,
      message: undefined,
      code: undefined,
      details: undefined,
    });
    setData(null);
  }, []);

  /**
   * Manually set error state
   */
  const setError = useCallback((message: string, code?: string | number, details?: Record<string, any>) => {
    setErrorState({
      hasError: true,
      message,
      code,
      details,
    });
    setLoadingState({
      isLoading: false,
      message: undefined,
      progress: undefined,
    });
  }, []);

  return {
    // State
    loadingState,
    errorState,
    data,

    // Actions
    execute,
    updateProgress,
    reset,
    setError,

    // Convenience accessors
    isLoading: loadingState.isLoading,
    hasError: errorState.hasError,
    error: errorState.message,
    progress: loadingState.progress,
  };
}
