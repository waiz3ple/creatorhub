import { ChevronRight, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: string;
  index: number;
  toolType: string;
  onOpenTool: (toolType: string, toolTitle: string) => void;
}

export function FeatureCard({ title, description, icon: Icon, features, color, index, toolType, onOpenTool }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex flex-col h-full">
          {/* Icon and Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-2xl ${color} shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300`}
            >
              <Icon className="h-8 w-8 text-white" strokeWidth={2} />
            </motion.div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 leading-tight">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed text-center">
            {description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                <div className={`w-2 h-2 ${color} rounded-full opacity-80`} />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Professional Action Button */}
          <Button
            onClick={() => onOpenTool(toolType, title)}
            className={`w-full ${color} hover:opacity-90 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 font-semibold text-sm py-3 relative overflow-hidden`}
          >
            <span className="flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform duration-200">
              <span>Launch Tool</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
