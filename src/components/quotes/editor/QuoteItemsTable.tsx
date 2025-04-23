
import React, { useState } from 'react';
import { QuoteItem } from '../../../types/quote';
import { Plus, GripVertical, X, Edit2, Check, Settings } from 'lucide-react';
import { Button } from '../../ui/button';

interface QuoteItemsTableProps {
  items: QuoteItem[];
  updateItems: (items: QuoteItem[]) => void;
}

const QuoteItemsTable: React.FC<QuoteItemsTableProps> = ({ items, updateItems }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleItemChange = (id: string, field: string, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate total if quantity or price changed
        if (field === 'quantity' || field === 'unitPrice') {
          const quantity = field === 'quantity' ? value : item.quantity || 0;
          const unitPrice = field === 'unitPrice' ? value : item.unitPrice || 0;
          updatedItem.totalHT = quantity * unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    updateItems(updatedItems);
  };

  const addItem = (type: 'supply' | 'labor' | 'work') => {
    const newItem: QuoteItem = {
      id: `item-${Date.now()}`,
      type: 'item',
      number: '1.3', // This should be computed dynamically
      description: type === 'supply' ? 'Fourniture' : type === 'labor' ? 'Main d\'œuvre' : 'Ouvrage',
      quantity: 1,
      unit: type === 'labor' ? 'h' : 'u',
      unitPrice: 0,
      vat: 10,
      totalHT: 0
    };
    
    updateItems([...items, newItem]);
  };

  const addSection = (type: 'section' | 'subsection' | 'text' | 'pagebreak') => {
    let newItem: QuoteItem;
    
    switch(type) {
      case 'section':
        newItem = {
          id: `section-${Date.now()}`,
          type: 'section',
          number: '2', // Should compute dynamically
          description: 'Nouvelle section',
          totalHT: 0
        };
        break;
      case 'subsection':
        newItem = {
          id: `subsection-${Date.now()}`,
          type: 'subsection',
          number: '1.3', // Should compute dynamically
          description: 'Nouvelle sous-section',
        };
        break;
      case 'text':
        newItem = {
          id: `text-${Date.now()}`,
          type: 'text',
          number: '-',
          description: 'Texte libre',
        };
        break;
      case 'pagebreak':
        newItem = {
          id: `pagebreak-${Date.now()}`,
          type: 'pagebreak',
          number: '-',
          description: '[Saut de page]',
        };
        break;
      default:
        return;
    }
    
    updateItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    updateItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1E88E5] text-white">
              <th className="px-3 py-2 text-left w-12">#</th>
              <th className="px-3 py-2 text-left">Désignation</th>
              <th className="px-3 py-2 text-right w-20">Qté</th>
              <th className="px-3 py-2 text-left w-24">Unité</th>
              <th className="px-3 py-2 text-right w-32">Prix U. HT</th>
              <th className="px-3 py-2 text-right w-32">Total HT</th>
              <th className="px-3 py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const isEditing = editingItemId === item.id;
              const isSection = item.type === 'section';
              const isText = item.type === 'text';
              const isItem = item.type === 'item';
              
              // Add alternating row styling, except for sections which have their own background
              const rowClass = isSection 
                ? 'bg-blue-50' 
                : index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                
              return (
                <tr key={item.id} className={rowClass}>
                  <td className="border-t px-3 py-2 flex items-center">
                    {!isText && <GripVertical size={14} className="text-gray-400 mr-1" />}
                    {item.number}
                  </td>
                  <td className="border-t px-3 py-2 font-medium">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full p-1 border rounded"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center justify-between group">
                        <span>{item.description}</span>
                        {isItem && (
                          <button 
                            onClick={() => setEditingItemId(item.id)}
                            className="invisible group-hover:visible text-gray-400 hover:text-gray-600"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="border-t px-3 py-2 text-right">
                    {isItem && (
                      isEditing ? (
                        <input
                          type="number"
                          className="w-full p-1 border rounded text-right"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                        />
                      ) : (
                        <span>{item.quantity}</span>
                      )
                    )}
                  </td>
                  <td className="border-t px-3 py-2">
                    {isItem && (
                      isEditing ? (
                        <select
                          className="w-full p-1 border rounded"
                          value={item.unit}
                          onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                        >
                          <option value="u">u</option>
                          <option value="m²">m²</option>
                          <option value="m">m</option>
                          <option value="h">h</option>
                          <option value="j">j</option>
                          <option value="f">f</option>
                        </select>
                      ) : (
                        <span>{item.unit}</span>
                      )
                    )}
                  </td>
                  <td className="border-t px-3 py-2 text-right">
                    {isItem && (
                      isEditing ? (
                        <div className="relative">
                          <input
                            type="number"
                            step="0.01"
                            className="w-full p-1 border rounded text-right pr-5"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2">€</span>
                        </div>
                      ) : (
                        <span>{item.unitPrice?.toFixed(2)} €</span>
                      )
                    )}
                  </td>
                  <td className="border-t px-3 py-2 text-right font-medium">
                    {isSection && <span>Sous-total : </span>}
                    {(isSection || isItem) && (
                      <span>{item.totalHT?.toFixed(2)} €</span>
                    )}
                  </td>
                  <td className="border-t px-3 py-2 text-center">
                    {isEditing ? (
                      <button 
                        onClick={() => setEditingItemId(null)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <Check size={18} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addItem('supply')}>
            <Plus size={16} className="mr-1" /> Fourniture
          </Button>
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addItem('labor')}>
            <Plus size={16} className="mr-1" /> Main d'œuvre
          </Button>
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addItem('work')}>
            <Plus size={16} className="mr-1" /> Ouvrage
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Settings size={16} className="mr-1" /> ...
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addSection('section')}>
            Section
          </Button>
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addSection('subsection')}>
            Sous-section
          </Button>
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addSection('text')}>
            Texte
          </Button>
          <Button variant="outline" size="sm" className="text-[#1E88E5]" onClick={() => addSection('pagebreak')}>
            Saut de page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteItemsTable;
