
import React, { useState, useEffect } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { QuoteItem } from '../../../contexts/QuoteContext';
import { Input } from "../../ui/input";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: QuoteItem) => void;
  libraryItems: QuoteItem[];
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, onAddItem, libraryItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [createMode, setCreateMode] = useState(false);
  const [newItem, setNewItem] = useState<Omit<QuoteItem, 'id'>>({
    description: '',
    quantity: 1,
    unit: 'u',
    unitPrice: 0,
    vatRate: 10
  });
  
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');
      setCreateMode(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleNewItemSubmit = () => {
    if (!newItem.description || newItem.unitPrice <= 0) {
      return;
    }
    
    const item: QuoteItem = {
      ...newItem,
      id: Date.now().toString()
    };
    
    onAddItem(item);
    onClose();
  };
  
  const handleItemClick = (item: QuoteItem) => {
    onAddItem({...item, id: Date.now().toString()});
    onClose();
  };
  
  const handleInputChange = (field: string, value: any) => {
    setNewItem({
      ...newItem,
      [field]: value
    });
  };

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || true; // TODO: Add categories to items
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'materials', name: 'Matériaux' },
    { id: 'labor', name: 'Main d\'œuvre' },
    { id: 'services', name: 'Services' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">
            {createMode ? "Nouvel élément" : "Ajouter un élément"}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {createMode ? (
          <div className="p-4 overflow-y-auto flex-grow">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <Input
                  placeholder="Description de l'élément"
                  value={newItem.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire *</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newItem.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TVA (%)</label>
                  <select
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                    value={newItem.vatRate}
                    onChange={(e) => handleInputChange('vatRate', parseInt(e.target.value))}
                  >
                    <option value="0">0%</option>
                    <option value="5.5">5.5%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={newItem.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unité</label>
                  <select
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                    value={newItem.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                  >
                    <option value="u">Unité</option>
                    <option value="m²">m²</option>
                    <option value="m">mètre</option>
                    <option value="h">Heure</option>
                    <option value="j">Jour</option>
                    <option value="f">Forfait</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="relative mb-4">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Rechercher un élément..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto py-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto border-t">
              {filteredItems.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <p className="font-medium">{item.description}</p>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <p>Prix: {item.unitPrice.toFixed(2)} €/{item.unit}</p>
                        <p>TVA: {item.vatRate}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun élément trouvé</p>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="p-4 border-t">
          {createMode ? (
            <div className="flex justify-between">
              <button 
                onClick={() => setCreateMode(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Annuler
              </button>
              <button 
                onClick={handleNewItemSubmit}
                className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300"
                disabled={!newItem.description || newItem.unitPrice <= 0}
              >
                Ajouter
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setCreateMode(true)}
              className="flex items-center justify-center w-full py-2 border border-dashed border-gray-400 rounded-md hover:bg-gray-50 text-gray-600"
            >
              <Plus size={16} className="mr-2" />
              Créer un nouvel élément
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
