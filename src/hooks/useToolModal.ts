import { useCallback, useState } from 'react';
import { ToolModalState } from '../types';

/**
 * Custom hook for managing tool modal state
 * Provides clean separation of modal logic from components
 */
export function useToolModal(initialState?: Partial<ToolModalState>) {
  const [modalState, setModalState] = useState<ToolModalState>({
    isOpen: false,
    selectedToolId: null,
    selectedToolTitle: '',
    ...initialState,
  });

  /**
   * Opens the modal with a specific tool
   */
  const openModal = useCallback((toolId: string, toolTitle: string) => {
    setModalState({
      isOpen: true,
      selectedToolId: toolId,
      selectedToolTitle: toolTitle,
    });
  }, []);

  /**
   * Closes the modal and resets state
   */
  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      selectedToolId: null,
      selectedToolTitle: '',
    });
  }, []);

  /**
   * Toggles modal state
   */
  const toggleModal = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    toggleModal,
    // Convenience accessors
    isOpen: modalState.isOpen,
    selectedToolId: modalState.selectedToolId,
    selectedToolTitle: modalState.selectedToolTitle,
  };
}
