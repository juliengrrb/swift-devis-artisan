
// Quote-related types
export interface Client {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
  };
}

export interface Site {
  id: string;
  name?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
}

export type QuoteItemType = 'section' | 'subsection' | 'item' | 'text' | 'pagebreak';

export interface QuoteItem {
  id: string;
  type: QuoteItemType;
  number: string;
  description: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  vat?: number;
  totalHT?: number;
}

export interface QuoteData {
  id: string;
  number: string;
  createdAt: string;
  validUntil: string;
  client: Client | null;
  site: Site | null;
  items: QuoteItem[];
  workStartDate: string | null;
  workDuration: string | null;
  paymentTerms: string;
  paymentMethods: string;
  wasteManagement: string;
  notes: string;
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
  vatBreakdown: Record<string, number>;
}
