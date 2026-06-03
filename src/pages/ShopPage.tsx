import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/mockData';
import type { Category, FilterState } from '../types';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    sortBy: 'featured',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync category from URL param
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setFilters((f) => ({ ...f, category: urlCategory as Category | 'All' }));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    const query = searchParams.get('q')?.toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, searchParams]);

  const searchQuery = searchParams.get('q');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-black text-gray-900">
            {searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            {filters.category !== 'All' && ` in ${filters.category}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            id="mobile-filter-toggle"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            Filters & Sort
            {(filters.category !== 'All' || filters.sortBy !== 'featured') && (
              <span className="w-2 h-2 bg-primary-600 rounded-full" />
            )}
          </button>
          {(filters.category !== 'All' || filters.sortBy !== 'featured') && (
            <button
              onClick={() => setFilters({ category: 'All', sortBy: 'featured' })}
              className="flex items-center gap-1 text-xs text-red-500 font-medium"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Mobile Filter Panel */}
        {mobileFiltersOpen && (
          <div className="lg:hidden mb-6 animate-slide-down">
            <ProductFilters
              filters={filters}
              onFilterChange={(f) => { setFilters(f); setMobileFiltersOpen(false); }}
              resultCount={filteredProducts.length}
            />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filteredProducts.length}
            />
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => setFilters({ category: 'All', sortBy: 'featured' })}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
