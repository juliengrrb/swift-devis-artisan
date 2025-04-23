import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import QuoteFilter from '../components/quotes/QuoteFilter';
import QuotesList from '../components/quotes/QuotesList';

const QuotesPage = () => {
  const allQuotes = [
    {
      id: '1',
      number: 'DEV-2025-001',
      client: 'Martin Dupont',
      title: 'Rénovation salle de bain',
      date: '2025-04-20',
      amount: 1250,
      status: 'pending' as const
    },
    {
      id: '2',
      number: 'DEV-2025-002',
      client: 'Jean Lefebvre',
      title: 'Installation électrique complète',
      date: '2025-04-15',
      amount: 3450,
      status: 'signed' as const
    },
    {
      id: '3',
      number: 'DEV-2025-003',
      client: 'Sophie Laurent',
      title: 'Pose de carrelage cuisine',
      date: '2025-04-10',
      amount: 980,
      status: 'draft' as const
    },
    {
      id: '4',
      number: 'DEV-2025-004',
      client: 'Pierre Martin',
      title: 'Peinture appartement',
      date: '2025-04-05',
      amount: 2200,
      status: 'converted' as const
    }
  ];
  
  const [filteredQuotes, setFilteredQuotes] = useState(allQuotes);
  
  const handleFilterChange = (filters: { status: string; search: string }) => {
    let result = [...allQuotes];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(quote => quote.status === filters.status);
    }
    
    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        quote => 
          quote.client.toLowerCase().includes(searchTerm) ||
          quote.title.toLowerCase().includes(searchTerm) ||
          quote.number.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredQuotes(result);
  };

  return (
    <Layout title="Devis" showBackButton={false}>
      <QuoteFilter onFilterChange={handleFilterChange} />
      <QuotesList quotes={filteredQuotes} />
    </Layout>
  );
};

export default QuotesPage;
