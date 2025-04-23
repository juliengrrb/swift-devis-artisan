
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ClientFilterProps {
  onFilterChange: (search: string) => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState<string>('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange(e.target.value);
  };
  
  return (
    <div className="mb-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={handleSearchChange}
          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default ClientFilter;
