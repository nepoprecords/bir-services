import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'orange' | 'green' | 'dark' | 'outline' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
  onPressSound?: () => void;
  icon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'orange',
  size = 'md',
  fullWidth = false,
  children,
  onPressSound,
  onClick,
  className = '',
  disabled = false,
  icon,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (onPressSound) onPressSound();
    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'orange':
        return 'bg-[#FF6B00] text-white border-b-4 border-[#C44E00] active:border-b-0 hover:bg-[#FF7A1A] active:translate-y-1 shadow-lg shadow-orange-950/40';
      case 'green':
        return 'bg-[#10B981] text-white border-b-4 border-[#047857] active:border-b-0 hover:bg-[#1FD89A] active:translate-y-1 shadow-lg shadow-emerald-950/40';
      case 'amber':
        return 'bg-[#FFB800] text-slate-950 border-b-4 border-[#D97706] active:border-b-0 hover:bg-[#FFC526] active:translate-y-1 font-bold shadow-lg shadow-amber-950/30';
      case 'dark':
        return 'bg-[#1E293B] text-slate-100 border-b-4 border-[#0F172A] active:border-b-0 hover:bg-[#334155] active:translate-y-1';
      case 'outline':
        return 'bg-slate-900/60 backdrop-blur-md text-slate-200 border-2 border-slate-700/80 border-b-4 border-b-slate-700 active:border-b-2 hover:border-slate-500 active:translate-y-1';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-xs rounded-xl font-semibold gap-1.5';
      case 'md':
        return 'py-2.5 px-5 text-sm rounded-2xl font-bold gap-2';
      case 'lg':
        return 'py-3.5 px-6 text-base rounded-2xl font-extrabold gap-2.5 tracking-wide';
      case 'xl':
        return 'py-4 px-8 text-lg rounded-2xl font-black gap-3 tracking-wide';
    }
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center select-none cursor-pointer transition-all duration-75
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
