
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight } from 'lucide-react';

const AIQuotePrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/quote-preview');
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-300 p-4">
          <div className="flex items-center mb-3">
            <Bot size={20} className="text-primary mr-2" />
            <h3 className="font-medium">Assistant IA</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Décrivez votre projet en langage naturel et l'IA générera 
            automatiquement un devis complet avec des prix estimatifs.
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Rénovation salle de bain avec pose de carrelage mural 15m², installation douche à l'italienne et remplacement lavabo"
            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isGenerating}
          />
          
          <div className="mt-4">
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-3 rounded-md text-white font-medium flex items-center justify-center transition ${
                !prompt.trim() || isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-600'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="mr-2">Génération en cours...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                <>
                  Générer le devis
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-3">
            Le temps de génération est généralement inférieur à 5 secondes.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">ou</p>
          <button 
            type="button"
            onClick={() => navigate('/create-quote/manual')}
            className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Créer manuellement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIQuotePrompt;
