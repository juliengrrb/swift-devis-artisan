
import React, { useState } from 'react';
import { QuoteData } from '../../../types/quote';
import { Button } from '../../ui/button';

interface QuoteFooterProps {
  quoteData: QuoteData;
  updateQuoteData: (field: string, value: any) => void;
  totalHT: number;
  totalTTC: number;
}

const QuoteFooter: React.FC<QuoteFooterProps> = ({ 
  quoteData, 
  updateQuoteData,
  totalHT,
  totalTTC
}) => {
  const [isEditingPaymentTerms, setIsEditingPaymentTerms] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState(quoteData.paymentTerms || '');

  const handlePaymentTermsChange = () => {
    updateQuoteData('paymentTerms', paymentTerms);
    setIsEditingPaymentTerms(false);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateQuoteData('notes', e.target.value);
  };

  return (
    <div className="border-t">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Left column - Payment terms */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              Conditions de paiement
              <button className="ml-2 text-blue-500 text-sm">+ Ajouter une condition</button>
            </h3>
            {isEditingPaymentTerms ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-grow p-2 border rounded-l"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  placeholder="Précisez vos conditions de paiement..."
                />
                <Button 
                  className="rounded-l-none" 
                  onClick={handlePaymentTermsChange}
                >
                  Enregistrer
                </Button>
              </div>
            ) : (
              <p 
                className="p-2 border rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => setIsEditingPaymentTerms(true)}
              >
                {paymentTerms || "Cliquez pour ajouter des conditions de paiement"}
              </p>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Méthodes de paiement acceptées</h3>
            <p className="text-gray-600">{quoteData.paymentMethods}</p>
          </div>
          
          <div className="flex items-center">
            <h3 className="font-medium">Gestion des déchets</h3>
            <button className="ml-2 text-blue-500 text-sm">Définir</button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Notes de bas de page</h3>
            <textarea
              className="w-full p-2 border rounded h-32 resize-none"
              value={quoteData.notes}
              onChange={handleNotesChange}
              placeholder="Ajoutez des notes ou précisions complémentaires..."
            />
          </div>
        </div>
        
        {/* Right column - Totals */}
        <div>
          <div className="bg-gray-50 p-4 rounded border">
            <div className="flex justify-between items-center mb-1">
              <span>Sous-total HT</span>
              <span>{totalHT.toFixed(2)} €</span>
            </div>
            
            {Object.entries(quoteData.vatBreakdown || {}).map(([rate, amount]) => (
              <div key={rate} className="flex justify-between items-center mb-1">
                <span>TVA {rate}%</span>
                <span>{((amount * Number(rate)) / 100).toFixed(2)} €</span>
              </div>
            ))}
            
            <div className="flex justify-between items-center font-medium border-t pt-2 mt-2">
              <span>Total net HT</span>
              <span>{totalHT.toFixed(2)} €</span>
            </div>
            
            <button className="text-blue-500 text-sm my-2 block">+ Définir un ajustement</button>
            
            <div className="bg-blue-500 text-white p-3 rounded mt-4">
              <div className="flex justify-between items-center font-bold">
                <span>NET À PAYER</span>
                <span>{totalTTC.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteFooter;
