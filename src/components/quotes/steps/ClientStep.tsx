
import React, { useState } from 'react';
import { useQuoteContext, Client } from '../../../contexts/QuoteContext';
import { Plus, Search, User, Building2, Phone, Mail, MapPin, X } from 'lucide-react';
import { Input } from "../../ui/input";

interface ClientStepProps {
  onSelectClient: (client: Client) => void;
  selectedClient: Client | null;
}

const ClientStep: React.FC<ClientStepProps> = ({ onSelectClient, selectedClient }) => {
  const { clients, addClient } = useQuoteContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    phone: '',
    email: '',
    company: '',
    address: {
      street: '',
      postalCode: '',
      city: ''
    }
  });

  const filteredClients = clients.filter(client => {
    const fullName = `${client.name} ${client.company || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleNewClientSubmit = () => {
    if (!newClient.name || !newClient.phone) {
      return;
    }
    
    const createdClient = addClient(newClient);
    onSelectClient(createdClient);
    setShowNewClientForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewClient({
        ...newClient,
        [parent]: {
          ...newClient[parent as keyof typeof newClient] as object,
          [child]: value
        }
      });
    } else {
      setNewClient({
        ...newClient,
        [field]: value
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">1. Client</h2>
      
      {selectedClient ? (
        <div className="p-4 border border-gray-200 rounded-md bg-blue-50 relative">
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => onSelectClient(selectedClient)}
          >
            <X size={18} />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            
            <div>
              <p className="font-semibold text-lg">{selectedClient.name}</p>
              {selectedClient.company && <p className="text-gray-600">{selectedClient.company}</p>}
              <div className="mt-2 space-y-1">
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" /> 
                  {selectedClient.phone}
                </p>
                {selectedClient.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-500" />
                    {selectedClient.email}
                  </p>
                )}
                {selectedClient.address?.street && (
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-500" />
                    {selectedClient.address.street}, {selectedClient.address.postalCode} {selectedClient.address.city}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {showNewClientForm ? (
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Nouveau client</h3>
                <button 
                  onClick={() => setShowNewClientForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <Input
                    placeholder="Nom complet"
                    value={newClient.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <Input
                    placeholder="Nom de l'entreprise"
                    value={newClient.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <Input
                    placeholder="Numéro de téléphone"
                    value={newClient.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    placeholder="Adresse email"
                    value={newClient.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    type="email"
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Adresse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <Input
                      placeholder="Rue"
                      value={newClient.address?.street || ''}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <Input
                      placeholder="Code postal"
                      value={newClient.address?.postalCode || ''}
                      onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <Input
                      placeholder="Ville"
                      value={newClient.address?.city || ''}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNewClientSubmit}
                  disabled={!newClient.name || !newClient.phone}
                  className="py-2 px-4 bg-primary text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Créer le client
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative mb-4">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher un client..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="bg-white rounded-md border border-gray-300 overflow-hidden">
                <div className="p-4 border-b border-gray-300">
                  <p className="font-medium">Clients récents</p>
                </div>
                
                {filteredClients.length > 0 ? (
                  filteredClients.map(client => (
                    <div 
                      key={client.id}
                      className="p-3 border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => onSelectClient(client)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{client.name}</p>
                          {client.company && <p className="text-sm text-gray-500">{client.company}</p>}
                          <p className="text-sm text-gray-500">{client.phone}</p>
                        </div>
                        <button className="text-primary hover:text-primary-600">
                          Sélectionner
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Aucun client trouvé
                  </div>
                )}
                
                <div 
                  className="p-3 hover:bg-blue-50 transition cursor-pointer flex items-center justify-center"
                  onClick={() => setShowNewClientForm(true)}
                >
                  <div className="flex items-center text-primary">
                    <Plus size={18} className="mr-2" />
                    <span>Nouveau client</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClientStep;
