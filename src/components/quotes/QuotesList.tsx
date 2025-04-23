
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check, AlertTriangle, Eye, Pencil } from 'lucide-react';

interface Quote {
  id: string;
  number: string;
  client: string;
  title: string;
  date: string;
  amount: number;
  status: 'draft' | 'pending' | 'signed' | 'converted' | 'cancelled';
}

interface QuotesListProps {
  quotes: Quote[];
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes }) => {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="status-badge bg-gray-100 text-gray-800">Brouillon</span>;
      case 'pending':
        return <span className="status-badge status-badge-pending flex items-center"><Clock size={12} className="mr-1" /> En attente</span>;
      case 'signed':
        return <span className="status-badge status-badge-signed flex items-center"><Check size={12} className="mr-1" /> Signé</span>;
      case 'converted':
        return <span className="status-badge bg-blue-100 text-blue-800">Facturé</span>;
      case 'cancelled':
        return <span className="status-badge bg-red-100 text-red-800">Annulé</span>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="space-y-4">
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div key={quote.id} className="card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">Devis #{quote.number}</p>
                <p className="text-sm text-gray-500">{quote.client}</p>
              </div>
              <div>{getStatusBadge(quote.status)}</div>
            </div>
            
            <p className="text-gray-700 text-sm mb-2">{quote.title}</p>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Date: {formatDate(quote.date)}</p>
                <p className="font-semibold mt-1">{formatCurrency(quote.amount)}</p>
              </div>
              
              <div className="flex space-x-2">
                <Link to={`/quotes/${quote.id}`} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Eye size={18} className="text-gray-500" />
                </Link>
                <Link to={`/quotes/edit/${quote.id}`} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Pencil size={18} className="text-gray-500" />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Aucun devis trouvé</p>
        </div>
      )}
    </div>
  );
};

export default QuotesList;
