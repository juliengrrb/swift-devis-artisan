
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { QuoteItem } from '../../../contexts/QuoteContext';
import { Input } from "../../ui/input";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: QuoteItem;
  onUpdateItem: (item: QuoteItem) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, item, onUpdateItem }) => {
  const [editedItem, setEditedItem] = useState<QuoteItem>({...item});
  
  useEffect(() => {
    if (isOpen && item) {
      setEditedItem({...item});
    }
  }, [isOpen, item]);

  if (!isOpen) return null;
  
  const handleInputChange = (field: string, value: any) => {
    setEditedItem({
      ...editedItem,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (!editedItem.description || editedItem.unitPrice <= 0) {
      return;
    }
    
    onUpdateItem(editedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">Modifier l'élément</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <Input
                placeholder="Description de l'élément"
                value={editedItem.description}
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
                  value={editedItem.unitPrice}
                  onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TVA (%)</label>
                <select
                  className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  value={editedItem.vatRate}
                  onChange={(e) => handleInputChange('vatRate', parseFloat(e.target.value))}
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
                  value={editedItem.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unité</label>
                <select
                  className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  value={editedItem.unit}
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
        
        <div className="p-4 border-t">
          <div className="flex justify-between">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Annuler
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300"
              disabled={!editedItem.description || editedItem.unitPrice <= 0}
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
