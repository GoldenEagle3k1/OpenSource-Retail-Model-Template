import React from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  className,
}) => {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={clsx(
              starSize,
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
      <span className={clsx('text-gray-500', size === 'sm' ? 'text-xs' : 'text-sm')}>
        <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
        {reviewCount !== undefined && ` (${reviewCount.toLocaleString()})`}
      </span>
    </div>
  );
};

export default StarRating;
