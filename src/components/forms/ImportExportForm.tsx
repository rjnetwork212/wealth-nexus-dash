import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImportExportFormProps {
  onExportJSON: () => any;
  onExportCSV: () => void;
  onImport: (data: any) => void;
}

export const ImportExportForm = ({ onExportJSON, onExportCSV, onImport }: ImportExportFormProps) => {
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExportJSON = () => {
    const data = onExportJSON();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Financial data exported to JSON file",
    });
    setExportOpen(false);
  };

  const handleExportCSV = () => {
    onExportCSV();
    toast({
      title: "Export Successful", 
      description: "Transaction data exported to CSV file",
    });
    setExportOpen(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let data;
        
        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          // Simple CSV parsing for transactions
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          const transactions = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',');
            return {
              date: values[0],
              type: values[1],
              category: values[2], 
              asset: values[3],
              amount: parseFloat(values[4]),
              description: values[5] || ''
            };
          });
          data = { transactions };
        } else {
          throw new Error('Unsupported file format');
        }

        onImport(data);
        setImportOpen(false);
        
        toast({
          title: "Import Successful",
          description: "Financial data imported successfully",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Failed to parse the file. Please check the format.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      {/* Export Dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Financial Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose the format to export your financial data:
            </p>
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={handleExportJSON} className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Export as JSON (Complete Backup)
              </Button>
              <Button onClick={handleExportCSV} variant="outline" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Export Transactions as CSV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Financial Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Import your financial data from a JSON backup or CSV file:
            </p>
            <div className="space-y-2">
              <Label htmlFor="import-file">Select File</Label>
              <Input
                id="import-file"
                type="file"
                ref={fileInputRef}
                accept=".json,.csv"
                onChange={handleImport}
                className="cursor-pointer"
              />
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• JSON: Complete backup including portfolio and transactions</p>
              <p>• CSV: Transactions only (Date, Type, Category, Asset, Amount, Description)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};