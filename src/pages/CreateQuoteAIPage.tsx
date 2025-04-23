
import React from 'react';
import Layout from '../components/layout/Layout';
import AIQuotePrompt from '../components/quotes/AIQuotePrompt';

const CreateQuoteAIPage = () => {
  return (
    <Layout 
      title="Devis avec IA" 
      showBackButton={true}
    >
      <AIQuotePrompt />
    </Layout>
  );
};

export default CreateQuoteAIPage;
