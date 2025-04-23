
import React, { useState } from 'react';
import { QuoteItem, useQuoteContext } from '../../../contexts/QuoteContext';
import { Plus, Minus, X, Edit2 } from 'lucide-react';
import ItemModal from './ItemModal';
import EditItemModal from './EditItemModal';
import { Input } from "../../ui/input";

interface ItemsStepProps {
  items: QuoteItem[];
  onAddItem: (item: QuoteItem) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (item: QuoteItem) => void;
  title: string;
  setTitle: (title: string) => void;
  totals: { totalHT: number; totalVAT: number; totalTTC: number };
}

const ItemsStep: React.FC<ItemsStepProps> = ({ 
  items, 
  onAddItem, 
  onRemoveItem,
  onUpdateItem,
  title, 
  setTitle,
  totals
}) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<QuoteItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { libraryItems } = useQuoteContext();
  
  const handleEditClick = (item: QuoteItem) => {
    setEditingItem(item);
    setShowEditModal(true);
  };
  
  const handleUpdateItem = (updatedItem: QuoteItem) => {
    onUpdateItem(updatedItem);
    setShowEditModal(false);
    setEditingItem(null);
  };
  
  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        onUpdateItem({
          ...item,
          quantity: newQuantity
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">2. Contenu du devis</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre du devis
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Rénovation salle de bain"
          className="w-full"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Éléments du devis</h3>
          <button 
            onClick={() => setShowItemModal(true)}
            className="text-sm text-primary hover:text-primary-700 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Ajouter
          </button>
        </div>
        
        {items.length > 0 ? (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            {items.map((item, index) => (
              <div key={item.id} className={`p-4 ${index < items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{item.description}</p>
                      <p className="font-medium">{(item.quantity * item.unitPrice).toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-2">{item.quantity} {item.unit}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="ml-2">× {item.unitPrice.toFixed(2)} €</span>
                      </div>
                      <span>TVA: {item.vatRate}%</span>
                    </div>
                  </div>
                  
                  <div className="flex ml-4 space-x-2">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="p-1 text-gray-500 hover:text-primary"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-gray-50 p-4">
              <div className="flex justify-between mb-1">
                <p className="text-gray-600">Total HT:</p>
                <p className="font-medium">{totals.totalHT.toFixed(2)} €</p>
              </div>
              <div className="flex justify-between mb-1">
                <p className="text-gray-600">TVA:</p>
                <p className="font-medium">{totals.totalVAT.toFixed(2)} €</p>
              </div>
              <div className="flex justify-between font-semibold">
                <p>Total TTC:</p>
                <p>{totals.totalTTC.toFixed(2)} €</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">Aucun élément ajouté</p>
            <p className="text-sm text-gray-400">Cliquez sur "Ajouter" pour commencer</p>
            <button 
              onClick={() => setShowItemModal(true)}
              className="mt-4 px-4 py-2 border border-primary text-primary rounded-md hover:bg-blue-50"
            >
              <Plus size={16} className="inline mr-2" />
              Ajouter un élément
            </button>
          </div>
        )}
      </div>
      
      <ItemModal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        onAddItem={onAddItem}
        libraryItems={libraryItems}
      />
      
      {editingItem && (
        <EditItemModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          item={editingItem}
          onUpdateItem={handleUpdateItem}
        />
      )}
    </div>
  );
};

export default ItemsStep;
