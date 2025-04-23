
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface QuoteFilterProps {
  onFilterChange: (filters: { status: string; search: string }) => void;
}

const QuoteFilter: React.FC<QuoteFilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange({ status: newStatus, search });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ status, search: e.target.value });
  };
  
  return (
    <div className="mb-4 space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un devis..."
          value={search}
          onChange={handleSearchChange}
          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
        <button
          onClick={() => handleStatusChange('all')}
          className={`py-2 px-4 rounded-full whitespace-nowrap ${
            status === 'all'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => handleStatusChange('pending')}
          className={`py-2 px-4 rounded-full whitespace-nowrap ${
            status === 'pending'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => handleStatusChange('signed')}
          className={`py-2 px-4 rounded-full whitespace-nowrap ${
            status === 'signed'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          Signés
        </button>
        <button
          onClick={() => handleStatusChange('draft')}
          className={`py-2 px-4 rounded-full whitespace-nowrap ${
            status === 'draft'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-300'
          }`}
        >
          Brouillons
        </button>
      </div>
    </div>
  );
};

export default QuoteFilter;
