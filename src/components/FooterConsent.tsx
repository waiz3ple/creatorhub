import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, Eye, Download, Lock, Star, Globe } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

interface FooterConsentProps {
  isConsented: boolean;
  onConsentChange: (consented: boolean) => void;
}

export function FooterConsent({ isConsented, onConsentChange }: FooterConsentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="py-12"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Consent Checkbox */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  id="consent-checkbox"
                  checked={isConsented}
                  onCheckedChange={(checked) => onConsentChange(checked as boolean)}
                  className="border-2 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="consent-checkbox" className="cursor-pointer">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    I understand this is a portfolio project and agree to use it responsibly
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check this box to use the tools. By checking this, you acknowledge the terms below and agree to use CreatorHub for educational purposes only.
                  </p>
                </label>
                
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center space-x-2 mt-3 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Read full terms and conditions</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Expandable Legal Terms */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6">
                  
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Portfolio Project Notice</span>
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      This is a portfolio demonstration project. It is NOT a commercial service and should not be used for production work or sensitive content.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Terms of Use</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded mt-0.5">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">Legal Responsibility</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">You are solely responsible for ensuring you have the legal right to download, process, or convert any content. This includes copyright, licensing, and terms of service compliance.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded mt-0.5">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">Privacy & Data</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Files are processed locally in your browser when possible. No guarantees are made about data persistence or security. Do not use with sensitive information.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded mt-0.5">
                            <Download className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">No Warranty</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">This tool is provided "as is" without warranties. Results may vary, and the tool may not function as expected. Not suitable for commercial use.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded mt-0.5">
                            <Shield className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">Educational Use</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">This tool is designed for learning and demonstration purposes only. Not intended for commercial or production use.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Copyright Notice</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        You acknowledge that downloading copyrighted content without permission may violate copyright laws. 
                        Platform terms of service (YouTube, Instagram, etc.) may prohibit downloading. You assume all legal risks 
                        and agree to use this tool only with content you own or have explicit permission to download/process.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Notice */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <Shield className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy & Security First
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  This is a portfolio demonstration project. All processing happens locally when possible. 
                  Not designed for commercial use or sensitive data processing.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-500 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Educational Use Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Portfolio Project</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Open Source</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
              © 2024 CreatorHub. Built for educational purposes and skill demonstration. 
              Users are responsible for ensuring legal compliance with all applicable laws and platform terms.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}