import React from 'react';
import clsx from 'clsx';
import type { ProductBadge } from '../../types';

interface BadgeProps {
  variant: ProductBadge | 'category';
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  New: 'bg-emerald-100 text-emerald-700',
  Sale: 'bg-red-100 text-red-600',
  Hot: 'bg-amber-100 text-amber-700',
  category: 'bg-primary-100 text-primary-700',
};

const Badge: React.FC<BadgeProps> = ({ variant, className, children }) => {
  return (
    <span className={clsx('badge', variantStyles[variant], className)}>
      {children ?? variant}
    </span>
  );
};

export default Badge;
