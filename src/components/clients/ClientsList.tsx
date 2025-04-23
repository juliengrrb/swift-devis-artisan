
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Eye } from 'lucide-react';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  projectCount: number;
}

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  return (
    <div className="space-y-4">
      {clients.length > 0 ? (
        clients.map((client) => (
          <div key={client.id} className="card">
            <div className="flex justify-between">
              <div>
                <Link to={`/clients/${client.id}`} className="font-medium text-lg hover:text-primary transition-colors">
                  {client.firstName} {client.lastName}
                </Link>
                {client.company && <p className="text-sm text-gray-500">{client.company}</p>}
              </div>
              <Link to={`/clients/${client.id}`} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Eye size={18} className="text-gray-500" />
              </Link>
            </div>
            
            <div className="mt-3 space-y-2">
              {client.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-gray-400 mr-2" />
                  <p className="text-sm">{client.phone}</p>
                </div>
              )}
              
              {client.email && (
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-400 mr-2" />
                  <p className="text-sm">{client.email}</p>
                </div>
              )}
              
              {(client.address?.street || client.address?.city) && (
                <div className="flex items-start">
                  <MapPin size={16} className="text-gray-400 mr-2 mt-0.5" />
                  <div className="text-sm">
                    {client.address.street && <p>{client.address.street}</p>}
                    {client.address.postalCode && client.address.city && (
                      <p>{client.address.postalCode} {client.address.city}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm">
                <span className="text-gray-500">Projets: </span>
                <span className="font-medium">{client.projectCount}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="card p-8 text-center">
          <p className="text-gray-500">Aucun client trouvé</p>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
