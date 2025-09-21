import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Shield, Eye, Download, X } from 'lucide-react';
import { Button } from './ui/button';

interface ConsentModalProps {
  isOpen: boolean;
  onConsent: () => void;
  onDecline: () => void;
  toolName: string;
}

export function ConsentModal({ isOpen, onConsent, onDecline, toolName }: ConsentModalProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleConsent = () => {
    if (agreedToTerms) {
      onConsent();
      setHasReadTerms(false);
      setAgreedToTerms(false);
    }
  };

  const handleDecline = () => {
    onDecline();
    setHasReadTerms(false);
    setAgreedToTerms(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDecline}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  User Consent Required
                </h2>
              </div>
              <button
                onClick={handleDecline}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  ⚠️ Portfolio Project Notice
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  This is a portfolio demonstration project. It is NOT a commercial service and should not be used for production work or sensitive content.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Terms of Use for {toolName}</span>
                </h3>
                
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Legal Responsibility</p>
                      <p>You are solely responsible for ensuring you have the legal right to download, process, or convert any content. This includes copyright, licensing, and terms of service compliance.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded mt-0.5">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">Privacy & Data</p>
                      <p>Files are processed locally in your browser when possible. No guarantees are made about data persistence or security. Do not use with sensitive or confidential information.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded mt-0.5">
                      <Download className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">No Warranty</p>
                      <p>This tool is provided "as is" without warranties. Results may vary, and the tool may not function as expected. Not suitable for professional or commercial use.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Copyright Notice</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    You acknowledge that downloading copyrighted content without permission may violate copyright laws. 
                    Platform terms of service (YouTube, Instagram, etc.) may prohibit downloading. You assume all legal risks 
                    and agree to use this tool only with content you own or have explicit permission to download/process.
                  </p>
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasReadTerms}
                    onChange={(e) => setHasReadTerms(e.target.checked)}
                    className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I have read and understand this is a portfolio project, not a commercial service.
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    disabled={!hasReadTerms}
                    className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className={`text-sm ${hasReadTerms ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                    I understand my legal responsibilities and agree to use this tool at my own risk for educational/demonstration purposes only.
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="px-6"
              >
                I Decline
              </Button>
              <Button
                onClick={handleConsent}
                disabled={!agreedToTerms}
                className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                I Understand & Consent
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}