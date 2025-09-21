import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Upload, Download, FileText, File, Archive } from 'lucide-react';
import { motion } from 'motion/react';

export function DocumentToolPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [conversionType, setConversionType] = useState('pdf');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleConvert = () => {
    alert(`Converting ${files.length} document(s) to ${conversionType.toUpperCase()}`);
  };

  const conversions = [
    { from: 'Word', to: 'PDF', types: '.doc, .docx', icon: FileText },
    { from: 'PDF', to: 'Word', types: '.pdf', icon: File },
    { from: 'Excel', to: 'CSV', types: '.xls, .xlsx', icon: Archive },
    { from: 'PowerPoint', to: 'PDF', types: '.ppt, .pptx', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Upload Documents</h3>
          <p className="text-blue-600 mb-4">Select Word, PDF, Excel, or PowerPoint files</p>
          
          <Input
            type="file"
            multiple
            accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx"
            onChange={handleFileUpload}
            className="w-full max-w-md mx-auto"
          />
          
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/60 rounded-lg"
            >
              <p className="text-sm text-blue-700">
                {files.length} file(s) selected
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Conversion Options */}
      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Convert</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversions.map((conversion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <conversion.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {conversion.from} → {conversion.to}
                      </h4>
                      <p className="text-sm text-gray-500">{conversion.types}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Conversion Settings</h4>
            <div className="space-y-4">
              <div>
                <Label>Output Format</Label>
                <Select value={conversionType} onValueChange={setConversionType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">Word Document</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="txt">Plain Text</SelectItem>
                    <SelectItem value="rtf">Rich Text Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Page Orientation</Label>
                  <Select defaultValue="portrait">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Quality</SelectItem>
                      <SelectItem value="medium">Medium Quality</SelectItem>
                      <SelectItem value="low">Low Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={handleConvert} 
          disabled={files.length === 0}
          className="flex-1 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Convert Documents
        </Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Clear All
        </Button>
      </div>
    </div>
  );
}