import { useCallback, useState } from 'react';

export const useConsent = (initialState: boolean = false) => {
  const [isConsented, setIsConsented] = useState(initialState);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleConsentChange = useCallback((consented: boolean) => {
    setIsConsented(consented);
  }, []);

  const handleTermsRead = useCallback(() => {
    setHasReadTerms(true);
  }, []);

  const handleTermsAgreement = useCallback((agreed: boolean) => {
    setAgreedToTerms(agreed);
  }, []);

  const resetConsentState = useCallback(() => {
    setHasReadTerms(false);
    setAgreedToTerms(false);
  }, []);

  const canProceed = isConsented && hasReadTerms && agreedToTerms;

  return {
    isConsented,
    hasReadTerms,
    agreedToTerms,
    canProceed,
    handleConsentChange,
    handleTermsRead,
    handleTermsAgreement,
    resetConsentState
  };
};
