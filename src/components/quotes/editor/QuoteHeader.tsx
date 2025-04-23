
import React from 'react';
import { QuoteData } from '../../../types/quote';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface QuoteHeaderProps {
  quoteData: QuoteData;
  updateQuoteData: (field: string, value: any) => void;
}

const QuoteHeader: React.FC<QuoteHeaderProps> = ({ quoteData, updateQuoteData }) => {
  // Format date to display format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: fr });
    } catch (e) {
      return '';
    }
  };

  // Define a date 30 days from now
  const validUntilDate = quoteData.validUntil 
    ? formatDate(quoteData.validUntil) 
    : formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
  
  const todayDate = formatDate(new Date().toISOString());

  return (
    <div className="p-4 border-b">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Quote details */}
        <div>
          <h2 className="text-xl font-medium mb-1">Devis n°{quoteData.number}</h2>
          <p className="text-gray-600 mb-1">En date du {todayDate}</p>
          <p className="text-gray-600 mb-2">Valable jusqu'au {validUntilDate}</p>
          
          <div className="space-y-1">
            <p className="text-gray-600">
              Début des travaux: 
              <button className="text-blue-500 hover:underline ml-1" onClick={() => {}}>
                à définir
              </button>
            </p>
            <p className="text-gray-600">
              Durée estimée:
              <button className="text-blue-500 hover:underline ml-1" onClick={() => {}}>
                à définir
              </button> 
            </p>
          </div>
          
          <button className="mt-4 text-blue-500 flex items-center">
            <span className="mr-1">+</span> Ajouter une description
          </button>
        </div>
        
        {/* Right column - Client/Site selection */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Client</label>
            <select 
              className="w-full p-2 border rounded"
              value={quoteData.client?.id || ""}
              onChange={(e) => {/* Handle client selection */}}
            >
              <option value="">Sélectionner un client</option>
              <option value="client1">Martin Dupont</option>
              <option value="client2">Sophie Laurent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Chantier</label>
            <select 
              className="w-full p-2 border rounded"
              value={quoteData.site?.id || ""}
              onChange={(e) => {/* Handle site selection */}}
            >
              <option value="">Sélectionner un chantier</option>
              <option value="site1">15 rue de la Paix, 75001 Paris</option>
              <option value="site2">8 avenue des Fleurs, 69002 Lyon</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteHeader;
