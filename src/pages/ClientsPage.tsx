
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ClientFilter from '../components/clients/ClientFilter';
import ClientsList from '../components/clients/ClientsList';
import { Plus } from 'lucide-react';

const ClientsPage = () => {
  // Mock data for demo purposes
  const allClients = [
    {
      id: '1',
      firstName: 'Martin',
      lastName: 'Dupont',
      company: 'Dupont & Fils',
      email: 'martin@dupont.fr',
      phone: '06 12 34 56 78',
      address: {
        street: '15 rue de la Paix',
        city: 'Paris',
        postalCode: '75001'
      },
      projectCount: 3
    },
    {
      id: '2',
      firstName: 'Sophie',
      lastName: 'Laurent',
      email: 'sophie.laurent@gmail.com',
      phone: '07 23 45 67 89',
      address: {
        street: '8 avenue des Fleurs',
        city: 'Lyon',
        postalCode: '69002'
      },
      projectCount: 1
    },
    {
      id: '3',
      firstName: 'Jean',
      lastName: 'Lefebvre',
      company: 'Immobilier Lefebvre',
      email: 'contact@lefebvre-immo.fr',
      phone: '06 34 56 78 90',
      address: {
        street: '25 rue du Commerce',
        city: 'Bordeaux',
        postalCode: '33000'
      },
      projectCount: 2
    }
  ];
  
  const [filteredClients, setFilteredClients] = useState(allClients);
  
  const handleFilterChange = (search: string) => {
    if (!search) {
      setFilteredClients(allClients);
      return;
    }
    
    const searchTerm = search.toLowerCase();
    const result = allClients.filter(
      client => 
        client.firstName.toLowerCase().includes(searchTerm) ||
        client.lastName.toLowerCase().includes(searchTerm) ||
        (client.company && client.company.toLowerCase().includes(searchTerm)) ||
        (client.email && client.email.toLowerCase().includes(searchTerm)) ||
        client.phone.includes(searchTerm)
    );
    
    setFilteredClients(result);
  };

  return (
    <Layout title="Clients" showBackButton={false}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des clients</h2>
        <Link
          to="/clients/new"
          className="p-2 bg-accent hover:bg-accent-600 text-white rounded-full flex items-center justify-center transition"
        >
          <Plus size={20} />
        </Link>
      </div>
      
      <ClientFilter onFilterChange={handleFilterChange} />
      <ClientsList clients={filteredClients} />
    </Layout>
  );
};

export default ClientsPage;
