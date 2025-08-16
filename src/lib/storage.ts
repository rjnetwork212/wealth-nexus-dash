// Local storage utilities for financial data
export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'buy' | 'sell' | 'dividend';
  category: 'personal' | 'business' | 'crypto' | 'stock';
  asset: string;
  amount: number;
  date: string;
  description?: string;
}

export interface Portfolio {
  personal: number;
  business: number;
  crypto: number;
  stocks: number;
}

const STORAGE_KEYS = {
  TRANSACTIONS: 'financial_transactions',
  PORTFOLIO: 'financial_portfolio',
  SETTINGS: 'financial_settings'
};

export const storageService = {
  // Transactions
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  addTransaction: (transaction: Omit<Transaction, 'id'>) => {
    const transactions = storageService.getTransactions();
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    transactions.unshift(newTransaction);
    storageService.saveTransactions(transactions);
    return newTransaction;
  },

  deleteTransaction: (id: string) => {
    const transactions = storageService.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    storageService.saveTransactions(filtered);
  },

  // Portfolio
  getPortfolio: (): Portfolio => {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    return data ? JSON.parse(data) : {
      personal: 42500,
      business: 28950,
      crypto: 24680,
      stocks: 35150
    };
  },

  updatePortfolio: (portfolio: Portfolio) => {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
  },

  // Export data
  exportData: () => {
    const transactions = storageService.getTransactions();
    const portfolio = storageService.getPortfolio();
    
    return {
      transactions,
      portfolio,
      exportDate: new Date().toISOString()
    };
  },

  // Import data
  importData: (data: any) => {
    if (data.transactions) {
      storageService.saveTransactions(data.transactions);
    }
    if (data.portfolio) {
      storageService.updatePortfolio(data.portfolio);
    }
  },

  // CSV Export
  exportToCSV: () => {
    const transactions = storageService.getTransactions();
    const headers = ['Date', 'Type', 'Category', 'Asset', 'Amount', 'Description'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.asset,
        t.amount,
        t.description || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
};