
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus, X, Search, Check } from 'lucide-react';
import { useQuoteContext, Client, QuoteItem } from '../../contexts/QuoteContext';
import { toast } from '../../hooks/use-toast';
import ClientStep from './steps/ClientStep';
import ItemsStep from './steps/ItemsStep';
import FinalStep from './steps/FinalStep';

const QuoteFormNew: React.FC = () => {
  const navigate = useNavigate();
  const { addQuote } = useQuoteContext();
  
  // État pour suivre l'étape actuelle
  const [step, setStep] = useState<number>(1);
  
  // États pour les données du devis
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [title, setTitle] = useState('Rénovation salle de bain');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [paymentTerms, setPaymentTerms] = useState('À réception de facture');
  const [validity, setValidity] = useState(30);
  const [notes, setNotes] = useState('');
  
  // Navigation entre les étapes
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Vérifier que toutes les informations nécessaires sont présentes
      if (!selectedClient) {
        toast({
          title: "Client requis",
          description: "Veuillez sélectionner un client pour ce devis",
          variant: "destructive"
        });
        setStep(1);
        return;
      }

      if (items.length === 0) {
        toast({
          title: "Devis vide",
          description: "Veuillez ajouter au moins un élément au devis",
          variant: "destructive"
        });
        setStep(2);
        return;
      }
      
      // Créer le devis et le sauvegarder
      const quoteNumber = `DEV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      addQuote({
        number: quoteNumber,
        title,
        client: selectedClient,
        items,
        paymentTerms,
        validity,
        notes,
        status: 'draft'
      });
      
      toast({
        title: "Devis créé avec succès",
        description: `Le devis ${quoteNumber} a été créé et enregistré`,
      });
      
      navigate('/quotes');
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Calculer les totaux
  const calculateTotals = () => {
    const totalHT = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalVAT = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      return sum + (itemTotal * item.vatRate / 100);
    }, 0);
    const totalTTC = totalHT + totalVAT;
    
    return { totalHT, totalVAT, totalTTC };
  };

  // Gestionnaires d'événements pour les données du devis
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    if (step === 1) nextStep();
  };
  
  const handleAddItem = (item: QuoteItem) => {
    setItems([...items, { ...item, id: Date.now().toString() }]);
  };
  
  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };
  
  const handleUpdateItem = (updatedItem: QuoteItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  // Rendu conditionnel en fonction de l'étape actuelle
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ClientStep 
            onSelectClient={handleClientSelect} 
            selectedClient={selectedClient}
          />
        );
      case 2:
        return (
          <ItemsStep 
            items={items}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
            title={title}
            setTitle={setTitle}
            totals={calculateTotals()}
          />
        );
      case 3:
        return (
          <FinalStep 
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
            validity={validity}
            setValidity={setValidity}
            notes={notes}
            setNotes={setNotes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Indicateur d'étapes */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${s === step 
                  ? 'border-primary bg-primary text-white' 
                  : s < step 
                    ? 'border-primary bg-primary/20 text-primary' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
                }`}
            >
              {s < step ? <Check size={16} /> : s}
            </div>
            
            {s < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  s < step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Contenu de l'étape en cours */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderStepContent()}
      </div>
      
      {/* Navigation entre les étapes */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-md flex items-center justify-center transition hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2" size={18} />
            Retour
          </button>
        ) : (
          <div /> // Placeholder pour la flexbox
        )}
        
        <button
          onClick={nextStep}
          className="py-3 px-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
        >
          {step < 3 ? 'Continuer' : 'Enregistrer'}
          {step < 3 && <ArrowRight className="ml-2" size={18} />}
        </button>
      </div>
    </div>
  );
};

export default QuoteFormNew;
