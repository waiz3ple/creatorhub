import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { Upload, Download, ImageIcon, Minimize2, Maximize } from 'lucide-react';
import { motion } from 'motion/react';

export function ImageToolPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState([80]);
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [outputFormat, setOutputFormat] = useState('original');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleProcess = () => {
    // Simulate processing
    alert(`Processing ${files.length} image(s) with ${compressionLevel[0]}% compression`);
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Upload Images</h3>
          <p className="text-green-600 mb-4">Drag & drop or click to select images</p>
          
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full max-w-md mx-auto"
          />
          
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/60 rounded-lg"
            >
              <p className="text-sm text-green-700">
                {files.length} file(s) selected: {files.map(f => f.name).join(', ')}
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Tool Options */}
      <Tabs defaultValue="compress" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compress" className="flex items-center space-x-2">
            <Minimize2 className="h-4 w-4" />
            <span>Compress</span>
          </TabsTrigger>
          <TabsTrigger value="resize" className="flex items-center space-x-2">
            <Maximize className="h-4 w-4" />
            <span>Resize</span>
          </TabsTrigger>
          <TabsTrigger value="convert" className="flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Convert</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compress" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Compression Settings</h4>
            <div className="space-y-4">
              <div>
                <Label>Compression Level: {compressionLevel[0]}%</Label>
                <Slider
                  value={compressionLevel}
                  onValueChange={setCompressionLevel}
                  max={100}
                  min={10}
                  step={5}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Higher values = better quality, larger file size
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resize" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Resize Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="1920"
                  value={resizeWidth}
                  onChange={(e) => setResizeWidth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="1080"
                  value={resizeHeight}
                  onChange={(e) => setResizeHeight(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label>Preset Sizes</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {setResizeWidth('1920'); setResizeHeight('1080')}}
                >
                  HD (1920×1080)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {setResizeWidth('1280'); setResizeHeight('720')}}
                >
                  HD (1280×720)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {setResizeWidth('800'); setResizeHeight('600')}}
                >
                  Standard (800×600)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {setResizeWidth('400'); setResizeHeight('400')}}
                >
                  Square (400×400)
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="convert" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Format Conversion</h4>
            <div>
              <Label>Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Keep Original</SelectItem>
                  <SelectItem value="jpg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="avif">AVIF</SelectItem>
                  <SelectItem value="bmp">BMP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={handleProcess} 
          disabled={files.length === 0}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Process Images
        </Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Clear All
        </Button>
      </div>
    </div>
  );
}