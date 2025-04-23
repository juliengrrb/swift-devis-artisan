
import React, { useState, useEffect } from 'react';
import { X, Save, MoreHorizontal, FileText, Eye, PenLine } from 'lucide-react';
import QuoteHeader from './editor/QuoteHeader';
import QuoteItemsTable from './editor/QuoteItemsTable';
import QuoteFooter from './editor/QuoteFooter';
import { QuoteItem, QuoteData } from '../../types/quote';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from '../../hooks/use-toast';

const QuoteEditor = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [quoteData, setQuoteData] = useState<QuoteData>({
    id: '',
    number: `D${new Date().getFullYear()}${String(1).padStart(6, '0')}`,
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    client: null,
    site: null,
    items: [
      {
        id: 'section-1',
        type: 'section',
        number: '1',
        description: 'Titre section',
        totalHT: 0
      },
      {
        id: 'text-1',
        type: 'text',
        number: '-',
        description: 'Modifier le texte libre',
      },
      {
        id: 'item-1',
        type: 'item',
        number: '1.1',
        description: 'Ajouter ou rechercher dans la bibliothèque...',
        quantity: 1,
        unit: 'u',
        unitPrice: 0,
        vat: 10,
        totalHT: 0
      },
      {
        id: 'item-2',
        type: 'item',
        number: '1.2',
        description: '',
        quantity: 1,
        unit: 'h',
        unitPrice: 0,
        vat: 10,
        totalHT: 0
      }
    ],
    workStartDate: null,
    workDuration: null,
    paymentTerms: '',
    paymentMethods: 'Chèque, Espèces',
    wasteManagement: '',
    notes: '',
    totalHT: 0,
    totalVAT: 0,
    totalTTC: 0,
    vatBreakdown: {}
  });

  useEffect(() => {
    // Calculate totals when items change
    const { updatedItems, totalHT, totalVAT, totalTTC, vatBreakdown } = calculateTotals(quoteData.items);
    setQuoteData(prev => ({
      ...prev,
      items: updatedItems,
      totalHT,
      totalVAT,
      totalTTC,
      vatBreakdown
    }));
  }, [quoteData.items]);

  const calculateTotals = (items: QuoteItem[]) => {
    // Calculer les sous-totaux par section
    const sectionTotals: Record<string, number> = {};
    items.forEach(item => {
      if (item.type === 'item') {
        const sectionNumber = item.number.split('.')[0];
        const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
        sectionTotals[sectionNumber] = (sectionTotals[sectionNumber] || 0) + itemTotal;
      }
    });
    
    // Mettre à jour les sous-totaux dans les items
    const updatedItems = items.map(item => {
      if (item.type === 'section') {
        return {
          ...item,
          totalHT: sectionTotals[item.number] || 0
        };
      }
      if (item.type === 'item') {
        return {
          ...item,
          totalHT: (item.quantity || 0) * (item.unitPrice || 0)
        };
      }
      return item;
    });
    
    // Calculer le total général
    const totalHT = Object.values(sectionTotals).reduce((sum, val) => sum + val, 0);
    
    // Calculer la TVA par taux
    const vatBreakdown: Record<string, number> = {};
    items.forEach(item => {
      if (item.type === 'item') {
        const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
        const vatRate = item.vat || 0;
        if (vatRate > 0) {
          vatBreakdown[vatRate] = (vatBreakdown[vatRate] || 0) + itemTotal;
        }
      }
    });
    
    // Calculer la TVA totale
    const totalVAT = Object.entries(vatBreakdown).reduce(
      (sum, [rate, amount]) => sum + (amount * Number(rate) / 100), 0
    );
    
    const totalTTC = totalHT + totalVAT;
    
    return { updatedItems, totalHT, totalVAT, totalTTC, vatBreakdown };
  };

  const handleSave = () => {
    // TODO: Implement actual save logic with context
    toast({
      title: "Devis enregistré",
      description: `Le devis ${quoteData.number} a été sauvegardé avec succès.`,
    });
  };

  const handleCancel = () => {
    // Navigate back to quotes page
    window.history.back();
  };

  const handleFinalize = () => {
    toast({
      title: "Devis finalisé",
      description: "Le devis a été finalisé et est prêt à être envoyé.",
    });
  };

  const updateItems = (newItems: QuoteItem[]) => {
    setQuoteData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const updateQuoteData = (field: string, value: any) => {
    setQuoteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Barre supérieure */}
      <div className="flex justify-between items-center border-b bg-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-medium">Nouveau devis</h1>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')} className="ml-6">
            <TabsList>
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <PenLine size={16} />
                Édition
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye size={16} />
                Prévisualisation
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-gray-700">
            <MoreHorizontal size={16} className="mr-1" />
            Options
          </Button>
          <Button variant="outline" size="sm" className="text-gray-700" onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant="outline" size="sm" className="text-primary" onClick={handleSave}>
            <Save size={16} className="mr-1" />
            Enregistrer
          </Button>
          <Button size="sm" className="bg-green-500 text-white hover:bg-green-600" onClick={handleFinalize}>
            Finaliser et envoyer
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 p-1 ml-2">
            <X size={20} />
          </Button>
        </div>
      </div>

      {/* Corps principal */}
      <div className="container mx-auto py-4 px-6 max-w-7xl">
        {/* Alerte légale */}
        <div className="bg-[#FFF3CD] border border-[#FFEEBA] text-[#856404] p-3 mb-4 rounded flex items-center">
          <span className="mr-2">⚠️</span>
          <p>
            Certaines mentions légales obligatoires sur vos documents ne sont pas renseignées (5 manquantes). 
            <button className="text-blue-500 hover:underline ml-1">Configurer maintenant</button>.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white border rounded-md shadow-sm overflow-hidden">
          {activeTab === 'edit' ? (
            <>
              <QuoteHeader quoteData={quoteData} updateQuoteData={updateQuoteData} />
              <QuoteItemsTable items={quoteData.items} updateItems={updateItems} />
              <QuoteFooter 
                quoteData={quoteData} 
                updateQuoteData={updateQuoteData} 
                totalHT={quoteData.totalHT}
                totalTTC={quoteData.totalTTC}
              />
            </>
          ) : (
            <div className="p-6">
              <div className="border p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Aperçu du devis</h2>
                <p className="text-gray-500">La prévisualisation sera disponible prochainement.</p>
                <div className="mt-4 flex justify-center">
                  <FileText size={80} className="text-gray-300" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteEditor;
