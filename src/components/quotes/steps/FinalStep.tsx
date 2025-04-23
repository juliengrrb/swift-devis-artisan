
import React from 'react';
import { Input } from "../../ui/input";

interface FinalStepProps {
  paymentTerms: string;
  setPaymentTerms: (terms: string) => void;
  validity: number;
  setValidity: (validity: number) => void;
  notes: string;
  setNotes: (notes: string) => void;
}

const FinalStep: React.FC<FinalStepProps> = ({
  paymentTerms,
  setPaymentTerms,
  validity,
  setValidity,
  notes,
  setNotes
}) => {
  const paymentOptions = [
    'À réception de facture',
    '30% d\'acompte, solde à la livraison',
    'Paiement à 30 jours',
    '50% à la commande, 50% à la livraison',
    'Personnalisé'
  ];
  
  const validityOptions = [
    { label: '30 jours', value: 30 },
    { label: '60 jours', value: 60 },
    { label: '90 jours', value: 90 }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">3. Finalisation</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Conditions de paiement
        </label>
        <select 
          className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
        >
          {paymentOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        {paymentTerms === 'Personnalisé' && (
          <Input
            placeholder="Spécifiez vos conditions de paiement"
            className="mt-2"
            value={paymentTerms === 'Personnalisé' ? '' : paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
          />
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Validité du devis
        </label>
        <select 
          className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={validity}
          onChange={(e) => setValidity(parseInt(e.target.value))}
        >
          {validityOptions.map(option => (
            <option key={option.label} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes complémentaires
        </label>
        <textarea 
          placeholder="Ajoutez des détails supplémentaires ou des conditions spécifiques..."
          className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
        <h3 className="font-medium text-blue-800 mb-2">Prêt à finaliser</h3>
        <p className="text-sm text-blue-700">
          Vous êtes sur le point de finaliser votre devis. Après validation, il sera enregistré 
          et vous pourrez le retrouver dans la liste des devis.
        </p>
      </div>
    </div>
  );
};

export default FinalStep;
