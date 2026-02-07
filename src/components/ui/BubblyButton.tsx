import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface BubblyButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}
export function BubblyButton({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: BubblyButtonProps) {
  const variants = {
    primary:
    'bg-amal-green text-white border-b-4 border-green-800 hover:bg-green-600 active:border-b-0 active:translate-y-1',
    secondary:
    'bg-amal-red text-white border-b-4 border-red-800 hover:bg-red-600 active:border-b-0 active:translate-y-1',
    accent:
    'bg-amal-yellow text-amal-black border-b-4 border-yellow-600 hover:bg-yellow-400 active:border-b-0 active:translate-y-1',
    outline:
    'bg-white text-amal-black border-2 border-amal-black border-b-4 hover:bg-gray-50 active:border-b-2 active:translate-y-1'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-xl font-bold rounded-3xl'
  };
  return (
    <motion.button
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
      className={cn(
        'font-bold transition-all duration-100 flex items-center justify-center gap-2 shadow-lg',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}>

      {children}
    </motion.button>);

}