
import React from 'react';
import { FileText, Check, Clock, AlertTriangle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'quote' | 'invoice';
  number: string;
  client: string;
  amount: number;
  status: 'pending' | 'signed' | 'paid' | 'late';
  date: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge status-badge-pending flex items-center"><Clock size={12} className="mr-1" /> En attente</span>;
      case 'signed':
        return <span className="status-badge status-badge-signed flex items-center"><Check size={12} className="mr-1" /> Signé</span>;
      case 'paid':
        return <span className="status-badge status-badge-signed flex items-center"><Check size={12} className="mr-1" /> Payé</span>;
      case 'late':
        return <span className="status-badge status-badge-late flex items-center"><AlertTriangle size={12} className="mr-1" /> En retard</span>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Activité récente</h2>
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 p-2 rounded-md">
                  <FileText className="text-primary" size={20} />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{activity.type === 'quote' ? 'Devis' : 'Facture'} #{activity.number}</p>
                  <p className="text-sm text-gray-500">{activity.client}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(activity.amount)}</p>
                <div className="mt-1">{getStatusBadge(activity.status)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">Aucune activité récente</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
