import React from 'react';
import { Card } from './ui/card';
import { motion } from 'motion/react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  index: number;
}

export function StatsCard({ title, value, subtitle, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl text-center group hover:shadow-2xl transition-all duration-500">
        <div className="space-y-3">
          <motion.h3 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.h3>
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">{title}</p>
          <p className="text-gray-600 dark:text-gray-400 font-medium">{subtitle}</p>
        </div>
        
        {/* Decorative element */}
        <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
}