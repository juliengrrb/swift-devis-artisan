
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Client {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
  };
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  vatRate: number;
}

export interface Quote {
  id: string;
  number: string;
  title: string;
  client?: Client;
  items: QuoteItem[];
  paymentTerms: string;
  validity: number;
  notes: string;
  status: 'draft' | 'sent' | 'signed' | 'paid';
  createdAt: string;
}

interface QuoteContextType {
  quotes: Quote[];
  clients: Client[];
  libraryItems: QuoteItem[];
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt'>) => void;
  addClient: (client: Omit<Client, 'id'>) => Client;
  addLibraryItem: (item: Omit<QuoteItem, 'id'>) => QuoteItem;
  getQuote: (id: string) => Quote | undefined;
  getClient: (id: string) => Client | undefined;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [libraryItems, setLibraryItems] = useState<QuoteItem[]>([]);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const storedQuotes = localStorage.getItem('quotes');
    const storedClients = localStorage.getItem('clients');
    const storedItems = localStorage.getItem('libraryItems');

    if (storedQuotes) setQuotes(JSON.parse(storedQuotes));
    if (storedClients) setClients(JSON.parse(storedClients));
    if (storedItems) setLibraryItems(JSON.parse(storedItems));
    
    // Si pas de clients, ajouter des exemples
    if (!storedClients) {
      const defaultClients: Client[] = [
        {
          id: '1',
          name: 'Martin Dupont',
          company: 'Dupont & Fils',
          phone: '06 12 34 56 78',
          email: 'martin@dupont.fr',
          address: {
            street: '15 rue de la Paix',
            postalCode: '75001',
            city: 'Paris'
          }
        },
        {
          id: '2',
          name: 'Sophie Laurent',
          phone: '07 23 45 67 89',
          email: 'sophie.laurent@gmail.com',
          address: {
            street: '8 avenue des Fleurs',
            postalCode: '69002',
            city: 'Lyon'
          }
        }
      ];
      setClients(defaultClients);
      localStorage.setItem('clients', JSON.stringify(defaultClients));
    }
    
    // Si pas d'éléments, ajouter des exemples
    if (!storedItems) {
      const defaultItems: QuoteItem[] = [
        {
          id: '1',
          description: 'Carrelage sol standard',
          quantity: 1,
          unit: 'm²',
          unitPrice: 25.00,
          vatRate: 10
        },
        {
          id: '2',
          description: 'Main d'œuvre pose carrelage',
          quantity: 1,
          unit: 'm²',
          unitPrice: 35.00,
          vatRate: 10
        },
        {
          id: '3',
          description: 'Pose de carrelage mural',
          quantity: 1,
          unit: 'm²',
          unitPrice: 45.00,
          vatRate: 10
        },
        {
          id: '4',
          description: 'Installation douche à l\'italienne',
          quantity: 1,
          unit: 'u',
          unitPrice: 850.00,
          vatRate: 10
        },
        {
          id: '5',
          description: 'Remplacement lavabo',
          quantity: 1,
          unit: 'u',
          unitPrice: 450.00,
          vatRate: 10
        }
      ];
      setLibraryItems(defaultItems);
      localStorage.setItem('libraryItems', JSON.stringify(defaultItems));
    }
  }, []);

  // Sauvegarder les données dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('libraryItems', JSON.stringify(libraryItems));
  }, [libraryItems]);

  const addQuote = (quote: Omit<Quote, 'id' | 'createdAt'>) => {
    const newQuote: Quote = {
      ...quote,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setQuotes([...quotes, newQuote]);
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString()
    };
    setClients([...clients, newClient]);
    return newClient;
  };

  const addLibraryItem = (item: Omit<QuoteItem, 'id'>) => {
    const newItem: QuoteItem = {
      ...item,
      id: Date.now().toString()
    };
    setLibraryItems([...libraryItems, newItem]);
    return newItem;
  };

  const getQuote = (id: string) => quotes.find(q => q.id === id);
  const getClient = (id: string) => clients.find(c => c.id === id);

  return (
    <QuoteContext.Provider value={{ 
      quotes, 
      clients, 
      libraryItems, 
      addQuote, 
      addClient, 
      addLibraryItem, 
      getQuote, 
      getClient 
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteContext must be used within a QuoteProvider');
  }
  return context;
};
