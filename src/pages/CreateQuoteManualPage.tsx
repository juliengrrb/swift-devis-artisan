
import React from 'react';
import Layout from '../components/layout/Layout';
import QuoteForm from '../components/quotes/QuoteForm';

const CreateQuoteManualPage = () => {
  return (
    <Layout 
      title="Création de devis" 
      showBackButton={true}
    >
      <QuoteForm />
    </Layout>
  );
};

export default CreateQuoteManualPage;
