import { useState, useEffect } from 'react';
import { storageService, Transaction, Portfolio } from '@/lib/storage';

export const useFinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({ personal: 0, business: 0, crypto: 0, stocks: 0 });
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = () => {
      const savedTransactions = storageService.getTransactions();
      const savedPortfolio = storageService.getPortfolio();
      
      setTransactions(savedTransactions);
      setPortfolio(savedPortfolio);
      setLoading(false);
    };

    loadData();
  }, []);

  // Add transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = storageService.addTransaction(transaction);
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update portfolio based on transaction
    updatePortfolioFromTransaction(newTransaction);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      storageService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      
      // Reverse the portfolio update
      updatePortfolioFromTransaction(transaction, true);
    }
  };

  // Update portfolio from transaction
  const updatePortfolioFromTransaction = (transaction: Transaction, reverse = false) => {
    const multiplier = reverse ? -1 : 1;
    const amount = transaction.amount * multiplier;
    
    setPortfolio(prev => {
      let newPortfolio = { ...prev };
      
      if (transaction.type === 'income' || transaction.type === 'dividend') {
        newPortfolio[transaction.category] += amount;
      } else if (transaction.type === 'expense') {
        newPortfolio[transaction.category] -= amount;
      } else if (transaction.type === 'buy') {
        // For buy, we're converting cash to assets, so net is neutral
        // but we can track in specific category
        newPortfolio[transaction.category] += amount;
      } else if (transaction.type === 'sell') {
        newPortfolio[transaction.category] -= amount;
      }
      
      storageService.updatePortfolio(newPortfolio);
      return newPortfolio;
    });
  };

  // Manual portfolio update
  const updatePortfolio = (newPortfolio: Portfolio) => {
    setPortfolio(newPortfolio);
    storageService.updatePortfolio(newPortfolio);
  };

  // Export data
  const exportData = () => {
    return storageService.exportData();
  };

  // Import data
  const importData = (data: any) => {
    storageService.importData(data);
    setTransactions(storageService.getTransactions());
    setPortfolio(storageService.getPortfolio());
  };

  // CSV Export
  const exportToCSV = () => {
    storageService.exportToCSV();
  };

  // Calculate totals
  const totalPortfolio = portfolio.personal + portfolio.business + portfolio.crypto + portfolio.stocks;
  
  const monthlyIncome = transactions
    .filter(t => t.type === 'income' || t.type === 'dividend')
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentMonth = new Date();
      return transactionDate.getMonth() === currentMonth.getMonth() && 
             transactionDate.getFullYear() === currentMonth.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentMonth = new Date();
      return transactionDate.getMonth() === currentMonth.getMonth() && 
             transactionDate.getFullYear() === currentMonth.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    transactions,
    portfolio,
    loading,
    totalPortfolio,
    monthlyIncome,
    monthlyExpenses,
    addTransaction,
    deleteTransaction,
    updatePortfolio,
    exportData,
    importData,
    exportToCSV
  };
};