
import React from 'react';
import Layout from '../components/layout/Layout';
import QuoteFormNew from '../components/quotes/QuoteFormNew';

const CreateQuoteManualPage = () => {
  return (
    <Layout 
      title="Création de devis" 
      showBackButton={true}
    >
      <QuoteFormNew />
    </Layout>
  );
};

export default CreateQuoteManualPage;
