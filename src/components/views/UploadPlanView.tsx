
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UploadPlanView = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if it's an Excel or CSV file
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      if (['csv', 'xls', 'xlsx'].includes(fileExtension)) {
        setFile(selectedFile);
        setUploadStatus('idle');
      } else {
        setFile(null);
        setUploadStatus('error');
        setErrorMessage('Please select a CSV or Excel file.');
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate an upload process
    setTimeout(() => {
      setIsUploading(false);
      // For demo purposes, let's say upload was successful
      setUploadStatus('success');
      
      // In a real app, we would navigate to the simulation view
      // with the uploaded data after a successful upload
    }, 1500);
  };

  return (
    <div className="space-y-6 mx-auto max-w-xl animate-fade-in">
      <h1 className="text-2xl font-bold">Upload Media Plan</h1>
      <p className="text-muted-foreground">
        Upload your existing media plan in CSV or Excel format to analyze and optimize it.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Media Plan Upload</CardTitle>
          <CardDescription>
            Supported formats: .csv, .xls, .xlsx
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center space-y-2">
                <FileSpreadsheet className="h-8 w-8 text-predictify-purple" />
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p>Drag and drop your file here, or click to browse</p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          
          {uploadStatus === 'success' && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                File uploaded successfully! Processing your media plan...
              </AlertDescription>
            </Alert>
          )}
          
          {uploadStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading || uploadStatus === 'success'}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Media Plan'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadPlanView;
