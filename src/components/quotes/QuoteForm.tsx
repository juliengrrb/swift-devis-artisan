
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Plus, Search } from 'lucide-react';
import { useQuoteContext, Client, QuoteItem } from '../../contexts/QuoteContext';
import ItemModal from './ItemModal';
import { toast } from '../../hooks/use-toast';

const QuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const { clients, libraryItems, addQuote } = useQuoteContext();
  
  const [step, setStep] = useState<number>(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('Rénovation salle de bain');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [paymentTerms, setPaymentTerms] = useState('À réception de facture');
  const [validity, setValidity] = useState('30 jours');
  const [notes, setNotes] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);

  // Ajouter un nouvel élément au devis
  const addItem = (item: QuoteItem) => {
    setItems([...items, { ...item, id: Date.now().toString() }]);
  };
  
  // Supprimer un élément du devis
  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
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
  
  const { totalHT, totalVAT, totalTTC } = calculateTotals();
  
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
        validity: parseInt(validity),
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

  const selectClient = (client: Client) => {
    setSelectedClient(client);
    setStep(2);
  };

  const handleNewClient = () => {
    // Dans une vraie application, on ouvrirait un modal pour créer un client
    toast({
      title: "Fonctionnalité en cours de développement",
      description: "La création de nouveaux clients sera disponible prochainement"
    });
  };

  const filteredClients = clients.filter(client => {
    const fullName = `${client.name} ${client.company || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="bg-white rounded-md border border-gray-300 overflow-hidden">
              <div className="p-4 border-b border-gray-300">
                <p className="font-medium">Clients récents</p>
              </div>
              
              {filteredClients.map(client => (
                <div 
                  key={client.id}
                  className="p-3 border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => selectClient(client)}
                >
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.phone}</p>
                </div>
              ))}
              
              <div 
                className="p-3 hover:bg-blue-50 transition cursor-pointer"
                onClick={handleNewClient}
              >
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <p className="font-medium text-sm text-gray-700">Éléments du devis</p>
                
                {items.length > 0 ? (
                  items.map(item => (
                    <div key={item.id} className="p-3 border border-gray-300 rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.description}</p>
                        <p className="font-medium">{(item.quantity * item.unitPrice).toFixed(2)} €</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <p>{item.quantity} {item.unit} × {item.unitPrice.toFixed(2)} €</p>
                        <p>TVA: {item.vatRate}%</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm mt-1"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Aucun élément ajouté</p>
                    <p className="text-sm text-gray-400">Cliquez sur "Ajouter un élément" pour commencer</p>
                  </div>
                )}
                
                <div className="flex justify-center mt-2">
                  <button 
                    onClick={() => setShowItemModal(true)}
                    className="flex items-center px-4 py-2 border border-dashed border-gray-400 rounded-md hover:bg-gray-50 text-gray-500"
                  >
                    <Plus size={16} className="mr-2" />
                    Ajouter un élément
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">Total HT:</p>
                  <p className="font-medium">{totalHT.toFixed(2)} €</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-600">TVA ({items.length > 0 ? items[0].vatRate : 10}%):</p>
                  <p className="font-medium">{totalVAT.toFixed(2)} €</p>
                </div>
                <div className="flex justify-between font-semibold">
                  <p>Total TTC:</p>
                  <p>{totalTTC.toFixed(2)} €</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-md flex items-center justify-center transition"
              >
                <ArrowLeft className="mr-2" size={18} />
                Retour
              </button>
              
              <button
                onClick={nextStep}
                className="py-3 px-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
              >
                Continuer
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
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
                <select 
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                >
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
                <select 
                  className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                >
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-md flex items-center justify-center transition"
              >
                <ArrowLeft className="mr-2" size={18} />
                Retour
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={nextStep}
                  className="py-3 px-6 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition"
                >
                  Enregistrer
                </button>
                <button
                  onClick={nextStep}
                  className="py-3 px-6 bg-[#FF9800] hover:bg-[#F57C00] text-white font-medium rounded-md flex items-center justify-center transition"
                >
                  Enregistrer et envoyer
                </button>
              </div>
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
      
      <ItemModal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        onAddItem={addItem}
        libraryItems={libraryItems}
      />
    </div>
  );
};

export default QuoteForm;
