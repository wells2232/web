import { useState } from 'react';
import CreateItemForm from '@/components/create-item-form';
import { FilterBar } from '@/features/items/components/filter-bar';
import { HeroSection } from '@/features/items/components/hero-section';
import { useAuthStore } from '@/stores/use-auth-store';

export function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const [filters, setFilters] = useState({});

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, page: 1, [name]: value }));
  };
  console.log(filters);

  return (
    <div className="space-y-8">
      <div className="mx-auto flex w-fit" hidden>
        <CreateItemForm />
      </div>
      <HeroSection isFetching={false} searchTerm={''} setSearchTerm={''} />
      <FilterBar filters={filters} handleFilterChange={handleFilterChange} />
    </div>
  );
}
