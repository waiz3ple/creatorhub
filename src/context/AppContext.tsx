import React, { createContext, useCallback, useContext } from 'react';
import { useConsent, useModal } from '../hooks';
import { ToolSelectHandler } from '../types';

interface AppContextValue {
  // Consent state
  isConsented: boolean;
  hasReadTerms: boolean;
  agreedToTerms: boolean;
  canProceed: boolean;
  handleConsentChange: (consented: boolean) => void;
  handleTermsRead: () => void;
  handleTermsAgreement: (agreed: boolean) => void;
  resetConsentState: () => void;

  // Modal state
  isToolModalOpen: boolean;
  selectedTool: string | null;
  selectedToolTitle: string;
  openToolModal: (toolId: string, toolTitle: string) => void;
  closeToolModal: () => void;

  // Global actions
  handleToolSelect: ToolSelectHandler;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = React.memo<AppProviderProps>(({ children }) => {
  const consent = useConsent();
  const toolModal = useModal();
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const [selectedToolTitle, setSelectedToolTitle] = React.useState<string>('');

  const openToolModal = useCallback((toolId: string, toolTitle: string) => {
    setSelectedTool(toolId);
    setSelectedToolTitle(toolTitle);
    toolModal.openModal();
  }, [toolModal]);

  const closeToolModal = useCallback(() => {
    toolModal.closeModal();
    setSelectedTool(null);
    setSelectedToolTitle('');
  }, [toolModal]);

  const handleToolSelect: ToolSelectHandler = useCallback((toolId: string, toolTitle: string) => {
    if (!consent.isConsented) {
      // Scroll to footer to show consent checkbox
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    openToolModal(toolId, toolTitle);
  }, [consent.isConsented, openToolModal]);

  const value: AppContextValue = {
    // Consent state
    ...consent,

    // Modal state
    isToolModalOpen: toolModal.isOpen,
    selectedTool,
    selectedToolTitle,
    openToolModal,
    closeToolModal,

    // Global actions
    handleToolSelect
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
});

AppProvider.displayName = 'AppProvider';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
