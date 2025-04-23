
import React from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import Chart from '../components/dashboard/Chart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Button } from "../components/ui/button";

const Dashboard = () => {
  // Mock data for demo purposes
  const stats = [
    {
      title: 'Devis en cours',
      value: '6',
      icon: <FileText size={24} className="text-primary" />
    },
    {
      title: 'À signer',
      value: '3',
      icon: <Clock size={24} className="text-amber-500" />
    },
    {
      title: 'Signés',
      value: '12',
      icon: <CheckCircle size={24} className="text-success" />
    }
  ];
  
  const chartData = [
    { name: 'Jan', amount: 2500 },
    { name: 'Fév', amount: 3200 },
    { name: 'Mar', amount: 4100 },
    { name: 'Avr', amount: 3800 },
    { name: 'Mai', amount: 5200 },
    { name: 'Juin', amount: 4800 },
  ];
  
  const activities = [
    {
      id: '1',
      type: 'quote' as const,
      number: 'DEV-2025-001',
      client: 'Martin Dupont',
      amount: 1250,
      status: 'pending' as const,
      date: '2025-04-20'
    },
    {
      id: '2',
      type: 'invoice' as const,
      number: 'FAC-2025-001',
      client: 'Sophie Laurent',
      amount: 780.5,
      status: 'paid' as const,
      date: '2025-04-18'
    },
    {
      id: '3',
      type: 'quote' as const,
      number: 'DEV-2025-002',
      client: 'Jean Lefebvre',
      amount: 3450,
      status: 'signed' as const,
      date: '2025-04-15'
    }
  ];

  return (
    <Layout title="Tableau de bord">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
        
        <Chart data={chartData} />
        
        <RecentActivity activities={activities} />
        
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Voir plus d'activités
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
