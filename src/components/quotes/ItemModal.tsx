
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { QuoteItem } from '../../contexts/QuoteContext';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: QuoteItem) => void;
  libraryItems: QuoteItem[];
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, onAddItem, libraryItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemType, setSelectedItemType] = useState<string>('all');
  
  if (!isOpen) return null;

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedItemType === 'all' || selectedItemType === 'material'; // Simplified for now
    return matchesSearch && matchesType;
  });

  const handleItemClick = (item: QuoteItem) => {
    onAddItem(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Ajouter un élément</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher un élément..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="mb-4 flex space-x-2 overflow-x-auto">
          <button 
            className={`px-3 py-1 rounded-full text-sm ${selectedItemType === 'all' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedItemType('all')}
          >
            Tous
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm ${selectedItemType === 'material' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedItemType('material')}
          >
            Matériaux
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm ${selectedItemType === 'labor' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedItemType('labor')}
          >
            Main d'œuvre
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div 
                key={item.id}
                className="p-3 border border-gray-200 rounded-md mb-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleItemClick(item)}
              >
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-gray-500">
                  Prix unitaire: {item.unitPrice.toFixed(2)} € | TVA: {item.vatRate}%
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun élément trouvé</p>
              <button className="mt-4 flex items-center mx-auto text-primary">
                <Plus size={16} className="mr-1" />
                Créer un nouvel élément
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
