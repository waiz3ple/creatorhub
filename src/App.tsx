import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

// Components
import { DynamicSearchBar } from './components/DynamicSearchBar';
import { FooterConsent } from './components/FooterConsent';
import { ToolModal } from './components/ToolModal';

// Custom hooks
import { useToolModal } from './hooks';

// Constants and types
import { TOOLS } from './constants';
import type { Tool } from './types';

export default function App() {
  // Use the custom hook for modal management
  const { isOpen, selectedToolId, selectedToolTitle, openModal, closeModal } = useToolModal();

  const handleToolSelect = (toolId: string, toolTitle: string) => {
    openModal(toolId, toolTitle);
  };

  const handleCloseToolModal = () => {
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/10 to-cyan-600/10 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-bl from-violet-400/8 to-pink-400/8 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Main App Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pt-16 pb-8"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30" />
                <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  CreatorHub
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                  Professional Tool Suite
                </p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center">
          {/* Central Search Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-4xl mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Paste any URL to get started
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Enter a link from YouTube, Instagram, LinkedIn, or any supported platform
              </p>
            </div>

            <DynamicSearchBar isConsented={true} />
          </motion.div>

          {/* Tool Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Or choose a tool directly
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Professional-grade tools for content creation and optimization
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOOLS.map((tool: Tool, index: number) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="group relative"
                >

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleToolSelect(tool.id, tool.title)}
                    className={`
                      w-full aspect-square p-6 rounded-3xl
                      bg-white/80 dark:bg-gray-800/80
                      backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                      shadow-lg transition-all duration-300 ease-out
                      flex flex-col items-center justify-center text-center
                      relative overflow-hidden
                      hover:${tool.shadowColor} hover:shadow-xl
                    `}
                  >
                    {/* Hover gradient overlay */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${tool.hoverColor} opacity-0
                      group-hover:opacity-5 transition-opacity duration-300
                    `} />

                    {/* Icon */}
                    <div className={`
                      relative z-10 p-4 rounded-2xl bg-gradient-to-br ${tool.color}
                      shadow-lg group-hover:shadow-xl group-hover:scale-110
                      transition-all duration-300 mb-4
                    `}>
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Text */}
                    <div className="relative z-10">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm leading-tight">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer with Consent */}
        <FooterConsent
          isConsented={true}
          onConsentChange={() => {}}
        />
      </motion.div>

      {/* Tool Modal */}
      <ToolModal
        isOpen={isOpen}
        onClose={handleCloseToolModal}
        toolType={selectedToolId || ''}
        toolTitle={selectedToolTitle}
      />
    </div>
  );
}
