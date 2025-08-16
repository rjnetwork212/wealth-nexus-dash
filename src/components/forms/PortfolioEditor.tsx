import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Portfolio } from "@/lib/storage";

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onUpdatePortfolio: (portfolio: Portfolio) => void;
}

export const PortfolioEditor = ({ portfolio, onUpdatePortfolio }: PortfolioEditorProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(portfolio);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdatePortfolio(formData);
    setOpen(false);
    
    toast({
      title: "Success",
      description: "Portfolio values updated successfully",
    });
  };

  const handleInputChange = (key: keyof Portfolio, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [key]: numValue }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Portfolio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Portfolio Values</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="personal">Personal Assets ($)</Label>
            <Input
              id="personal"
              type="number"
              step="0.01"
              value={formData.personal}
              onChange={(e) => handleInputChange('personal', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="business">Business Value ($)</Label>
            <Input
              id="business"
              type="number"
              step="0.01"
              value={formData.business}
              onChange={(e) => handleInputChange('business', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="crypto">Crypto Holdings ($)</Label>
            <Input
              id="crypto"
              type="number"
              step="0.01"
              value={formData.crypto}
              onChange={(e) => handleInputChange('crypto', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="stocks">Stock Portfolio ($)</Label>
            <Input
              id="stocks"
              type="number"
              step="0.01"
              value={formData.stocks}
              onChange={(e) => handleInputChange('stocks', e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Update Portfolio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};