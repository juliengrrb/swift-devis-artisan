
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AIQuotePrompt from '../components/quotes/AIQuotePrompt';
import { FileText, Bot } from 'lucide-react';

const CreateQuotePage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout 
      title="Nouveau devis" 
      showBackButton={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/create-quote/ai')}
            className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bot size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Assistant IA</h3>
            <p className="text-gray-600">
              Décrivez votre projet en langage naturel et l'IA génère un devis complet
            </p>
          </button>
          
          <button
            onClick={() => navigate('/create-quote/manual')}
            className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Création manuelle</h3>
            <p className="text-gray-600">
              Créez votre devis étape par étape avec notre interface simplifiée
            </p>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuotePage;
