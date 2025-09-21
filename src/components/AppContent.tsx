import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

import { ErrorBoundary } from '../components/common';
import { DynamicSearchBar } from '../components/DynamicSearchBar';
import { FooterConsent } from '../components/FooterConsent';
import { AppHeader, Container, PageLayout, Section } from '../components/layout';
import { ToolModal } from '../components/ToolModal';
import { ANIMATION_VARIANTS } from '../config/animations';
import { TOOLS } from '../config/tools';
import { useAppContext } from '../context';

// Memoized ToolCard component to prevent unnecessary re-renders
const ToolCard = React.memo<{
  tool: typeof TOOLS[0];
  index: number;
  isConsented: boolean;
  onToolSelect: (toolId: string, toolTitle: string) => void;
}>(({ tool, index, isConsented, onToolSelect }) => {
  return (
    <motion.div
      initial={ANIMATION_VARIANTS.slideUp.initial}
      animate={ANIMATION_VARIANTS.slideUp.animate}
      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
      className="group relative"
    >
      {!isConsented && (
        <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-100/20 backdrop-blur-[1px] rounded-3xl z-10 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg shadow-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Please agree to<br />terms below
            </p>
          </div>
        </div>
      )}

      <motion.button
        whileHover={isConsented ? { scale: 1.02, y: -2 } : {}}
        whileTap={isConsented ? { scale: 0.98 } : {}}
        onClick={() => onToolSelect(tool.id, tool.title)}
        className={`
          w-full aspect-square p-6 rounded-3xl
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
          shadow-lg transition-all duration-300 ease-out
          flex flex-col items-center justify-center text-center
          relative overflow-hidden
          ${isConsented
            ? `hover:${tool.shadowColor} hover:shadow-xl`
            : 'cursor-not-allowed'
          }
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
  );
});

ToolCard.displayName = 'ToolCard';

// Main App Content Component
const AppContent = React.memo(() => {
  const {
    isConsented,
    isToolModalOpen,
    selectedTool,
    selectedToolTitle,
    handleToolSelect,
    closeToolModal,
    handleConsentChange
  } = useAppContext();

  return (
    <PageLayout>
      <AppHeader />

      <main className="flex-1 flex flex-col items-center justify-center">
        <Container>
          {/* Central Search Area */}
          <Section
            title="Paste any URL to get started"
            subtitle="Enter a link from YouTube, Instagram, LinkedIn, or any supported platform"
            delay={0.4}
            className="w-full mb-16"
          >
            <DynamicSearchBar isConsented={isConsented} />
          </Section>

          {/* Tool Grid */}
          <Section
            title="Or choose a tool directly"
            subtitle="Professional-grade tools for content creation and optimization"
            delay={0.6}
            className="w-full"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {TOOLS.map((tool, index) => (
                <ErrorBoundary key={tool.id}>
                  <ToolCard
                    tool={tool}
                    index={index}
                    isConsented={isConsented}
                    onToolSelect={handleToolSelect}
                  />
                </ErrorBoundary>
              ))}
            </div>
          </Section>
        </Container>
      </main>

      <FooterConsent
        isConsented={isConsented}
        onConsentChange={handleConsentChange}
      />

      <ToolModal
        isOpen={isToolModalOpen}
        onClose={closeToolModal}
        toolType={selectedTool || ''}
        toolTitle={selectedToolTitle}
      />
    </PageLayout>
  );
});

AppContent.displayName = 'AppContent';

export default AppContent;
