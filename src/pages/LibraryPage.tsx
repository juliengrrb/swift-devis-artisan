
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Search, Plus, Tag, Box, Grid, Tool } from 'lucide-react';

interface LibraryItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  type: 'material' | 'labor' | 'package';
  isFavorite: boolean;
}

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState<'materials' | 'labor' | 'packages'>('materials');
  const [search, setSearch] = useState('');
  
  // Mock data for demo purposes
  const allItems: LibraryItem[] = [
    {
      id: '1',
      name: 'Carrelage sol standard',
      description: 'Carrelage céramique 30x30cm',
      price: 25.0,
      unit: 'm²',
      type: 'material',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Carrelage mural standard',
      description: 'Carrelage céramique 20x20cm',
      price: 22.0,
      unit: 'm²',
      type: 'material',
      isFavorite: true
    },
    {
      id: '3',
      name: 'Main d\'œuvre pose carrelage',
      price: 35.0,
      unit: 'm²',
      type: 'labor',
      isFavorite: true
    },
    {
      id: '4',
      name: 'Main d\'œuvre plomberie',
      price: 45.0,
      unit: 'h',
      type: 'labor',
      isFavorite: false
    },
    {
      id: '5',
      name: 'Salle de bain complète',
      description: 'Inclut carrelage, sanitaires et pose',
      price: 2500.0,
      unit: 'forfait',
      type: 'package',
      isFavorite: false
    }
  ];
  
  // Filter items based on active tab and search
  const getFilteredItems = () => {
    let filtered = allItems;
    
    // Filter by type
    filtered = filtered.filter(item => item.type === activeTab);
    
    // Filter by search
    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(searchTerm) ||
          (item.description && item.description.toLowerCase().includes(searchTerm))
      );
    }
    
    return filtered;
  };
  
  // Get favorite items
  const favoriteItems = allItems.filter(item => item.isFavorite);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <Layout title="Bibliothèque" showBackButton={false}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Mes éléments</h2>
        <Link
          to="/library/new"
          className="p-2 bg-accent hover:bg-accent-600 text-white rounded-full flex items-center justify-center transition"
        >
          <Plus size={20} />
        </Link>
      </div>
      
      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un élément..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex items-center py-2 px-4 ${
            activeTab === 'materials'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500'
          }`}
        >
          <Box size={18} className="mr-1" />
          Matériaux
        </button>
        <button
          onClick={() => setActiveTab('labor')}
          className={`flex items-center py-2 px-4 ${
            activeTab === 'labor'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500'
          }`}
        >
          <Tool size={18} className="mr-1" />
          Main d'œuvre
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center py-2 px-4 ${
            activeTab === 'packages'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500'
          }`}
        >
          <Grid size={18} className="mr-1" />
          Ouvrages
        </button>
      </div>
      
      {/* Favorites Section */}
      {favoriteItems.length > 0 && !search && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-3">Favoris</h3>
          <div className="space-y-3">
            {favoriteItems.map(item => (
              <div key={item.id} className="card">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                    <p className="text-xs text-gray-500">par {item.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Items List */}
      <div>
        {activeTab === 'materials' && <h3 className="font-medium text-gray-700 mb-3">Matériaux</h3>}
        {activeTab === 'labor' && <h3 className="font-medium text-gray-700 mb-3">Main d'œuvre</h3>}
        {activeTab === 'packages' && <h3 className="font-medium text-gray-700 mb-3">Ouvrages</h3>}
        
        <div className="space-y-3">
          {getFilteredItems().map(item => (
            <div key={item.id} className="card">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(item.price)}</p>
                  <p className="text-xs text-gray-500">par {item.unit}</p>
                </div>
              </div>
            </div>
          ))}
          
          {getFilteredItems().length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-gray-500">Aucun élément trouvé</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LibraryPage;
