import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/lib/storage";

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    asset: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.category || !formData.asset || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const transaction = {
      type: formData.type as Transaction['type'],
      category: formData.category as Transaction['category'],
      asset: formData.asset,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      type: '',
      category: '',
      asset: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };

  const getTypeOptions = () => {
    switch (formData.category) {
      case 'personal':
        return [
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' }
        ];
      case 'business':
        return [
          { value: 'income', label: 'Revenue' },
          { value: 'expense', label: 'Expense' }
        ];
      case 'crypto':
      case 'stock':
        return [
          { value: 'buy', label: 'Buy' },
          { value: 'sell', label: 'Sell' },
          { value: 'dividend', label: 'Dividend' }
        ];
      default:
        return [];
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, type: '' }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Finance</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="stock">Stocks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.category && (
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {getTypeOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="asset">Asset/Description *</Label>
            <Input
              id="asset"
              value={formData.asset}
              onChange={(e) => setFormData(prev => ({ ...prev, asset: e.target.value }))}
              placeholder="e.g., AAPL, Bitcoin, Salary, Office Rent"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount ($) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};