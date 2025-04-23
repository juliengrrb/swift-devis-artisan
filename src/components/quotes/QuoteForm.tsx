
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Search } from 'lucide-react';

const QuoteForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form and navigate to quote preview
      navigate('/quote-preview');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold">1. Client</h2>
            
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Rechercher un client..."
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="bg-white rounded-md border border-gray-300 overflow-hidden">
              <div className="p-4 border-b border-gray-300">
                <p className="font-medium">Clients récents</p>
              </div>
              
              <div className="p-3 border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer">
                <p className="font-medium">Martin Dupont</p>
                <p className="text-sm text-gray-500">06 23 45 67 89</p>
              </div>
              
              <div className="p-3 border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer">
                <p className="font-medium">Sophie Laurent</p>
                <p className="text-sm text-gray-500">06 12 34 56 78</p>
              </div>
              
              <div className="p-3 hover:bg-blue-50 transition cursor-pointer">
                <div className="flex items-center text-primary">
                  <Plus size={18} className="mr-2" />
                  <span>Nouveau client</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={nextStep}
              className="w-full py-3 mt-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
            >
              Continuer
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold">2. Contenu du devis</h2>
            
            <div className="bg-white rounded-md border border-gray-300 p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du devis
                </label>
                <input 
                  id="title"
                  type="text"
                  placeholder="Ex: Rénovation salle de bain"
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="space-y-3">
                <p className="font-medium text-sm text-gray-700">Éléments du devis</p>
                
                <div className="p-3 border border-gray-300 rounded-md">
                  <div className="flex justify-between">
                    <p className="font-medium">Pose de carrelage</p>
                    <p className="font-medium">350,00 €</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <p>10 m² × 35,00 €</p>
                    <p>TVA: 10%</p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <button className="flex items-center px-4 py-2 border border-dashed border-gray-400 rounded-md hover:bg-gray-50 text-gray-500">
                    <Plus size={16} className="mr-2" />
                    Ajouter un élément
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Total HT:</p>
                  <p className="font-medium">350,00 €</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">TVA (10%):</p>
                  <p className="font-medium">35,00 €</p>
                </div>
                <div className="flex justify-between font-semibold">
                  <p>Total TTC:</p>
                  <p>385,00 €</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={nextStep}
              className="w-full py-3 mt-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
            >
              Continuer
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold">3. Finalisation</h2>
            
            <div className="bg-white rounded-md border border-gray-300 p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conditions de paiement
                </label>
                <select className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>À réception de facture</option>
                  <option>30% d'acompte, solde à la livraison</option>
                  <option>Paiement à 30 jours</option>
                  <option>Personnalisé</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validité du devis
                </label>
                <select className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>30 jours</option>
                  <option>60 jours</option>
                  <option>90 jours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes complémentaires
                </label>
                <textarea 
                  placeholder="Ajoutez des détails supplémentaires ou des conditions spécifiques..."
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={nextStep}
                className="flex-1 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
              >
                Prévisualiser
              </button>
              <button
                onClick={() => navigate('/quotes')}
                className="flex-1 py-3 bg-accent hover:bg-accent-600 text-white font-medium rounded-md flex items-center justify-center transition"
              >
                Enregistrer et envoyer
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full mx-1 ${
              s <= step ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {renderStepContent()}
    </div>
  );
};

export default QuoteForm;
