import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
}
export function ChatBubble({ message, isUser = false }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      className={cn(
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}>

      <div
        className={cn(
          'max-w-[80%] px-6 py-4 text-lg font-medium shadow-md relative',
          isUser ?
          'bg-amal-green text-white rounded-3xl rounded-tr-sm' :
          'bg-white text-amal-black border-2 border-gray-100 rounded-3xl rounded-tl-sm'
        )}>

        {message}
      </div>
    </motion.div>);

}