import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Category, FilterState } from '../../types';
import clsx from 'clsx';

const CATEGORIES: Array<Category | 'All'> = [
  'All',
  'Electronics',
  'Clothing',
  'Home',
  'Sports',
  'Beauty',
  'Bike Spare Parts',
];

const SORT_OPTIONS: Array<{ value: FilterState['sortBy']; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  resultCount,
}) => {
  const setCategory = (category: Category | 'All') =>
    onFilterChange({ ...filters, category });

  const setSort = (sortBy: FilterState['sortBy']) =>
    onFilterChange({ ...filters, sortBy });

  const hasActiveFilter = filters.category !== 'All' || filters.sortBy !== 'featured';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary-600" />
          <span className="font-semibold text-gray-900">Filters</span>
        </div>
        {hasActiveFilter && (
          <button
            onClick={() => onFilterChange({ category: 'All', sortBy: 'featured' })}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        <span className="font-semibold text-gray-900">{resultCount}</span> products found
      </p>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={clsx(
                'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                filters.category === cat
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span>{cat}</span>
              {filters.category === cat && (
                <div className="w-2 h-2 rounded-full bg-primary-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              id={`sort-${opt.value}`}
              className={clsx(
                'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                filters.sortBy === opt.value
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span>{opt.label}</span>
              {filters.sortBy === opt.value && (
                <div className="w-2 h-2 rounded-full bg-primary-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
