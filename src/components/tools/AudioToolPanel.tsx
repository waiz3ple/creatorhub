import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { Upload, Download, Music, Volume2, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function AudioToolPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [quality, setQuality] = useState([320]);
  const [sampleRate, setSampleRate] = useState('44100');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleConvert = () => {
    alert(`Converting ${files.length} audio file(s) to ${outputFormat.toUpperCase()} at ${quality[0]}kbps`);
  };

  const formats = [
    { value: 'mp3', label: 'MP3', description: 'Most compatible' },
    { value: 'wav', label: 'WAV', description: 'Lossless quality' },
    { value: 'flac', label: 'FLAC', description: 'Compressed lossless' },
    { value: 'aac', label: 'AAC', description: 'Apple standard' },
    { value: 'ogg', label: 'OGG', description: 'Open source' },
    { value: 'm4a', label: 'M4A', description: 'iTunes format' }
  ];

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Upload Audio Files</h3>
          <p className="text-purple-600 mb-4">Select MP3, WAV, FLAC, or other audio formats</p>
          
          <Input
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileUpload}
            className="w-full max-w-md mx-auto"
          />
          
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/60 rounded-lg"
            >
              <p className="text-sm text-purple-700">
                {files.length} audio file(s) selected
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Conversion Options */}
      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="format" className="flex items-center space-x-2">
            <Music className="h-4 w-4" />
            <span>Format</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <span>Quality</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formats.map((format, index) => (
              <motion.div
                key={format.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    outputFormat === format.value ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setOutputFormat(format.value)}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800">{format.label}</h4>
                    <p className="text-sm text-gray-500 mt-1">{format.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Audio Quality Settings</h4>
            <div className="space-y-6">
              <div>
                <Label>Bitrate: {quality[0]} kbps</Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={320}
                  min={64}
                  step={32}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>64 kbps (Low)</span>
                  <span>128 kbps (Standard)</span>
                  <span>320 kbps (High)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Sample Rate</Label>
                  <Select value={sampleRate} onValueChange={setSampleRate}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22050">22,050 Hz</SelectItem>
                      <SelectItem value="44100">44,100 Hz (CD Quality)</SelectItem>
                      <SelectItem value="48000">48,000 Hz (Studio)</SelectItem>
                      <SelectItem value="96000">96,000 Hz (High Res)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Channels</Label>
                  <Select defaultValue="stereo">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mono">Mono</SelectItem>
                      <SelectItem value="stereo">Stereo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">Advanced Options</h4>
            <div className="space-y-4">
              <div>
                <Label>Normalization</Label>
                <Select defaultValue="none">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Normalization</SelectItem>
                    <SelectItem value="peak">Peak Normalization</SelectItem>
                    <SelectItem value="rms">RMS Normalization</SelectItem>
                    <SelectItem value="loudness">Loudness Normalization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fade In (seconds)</Label>
                  <Input type="number" placeholder="0" className="mt-2" />
                </div>
                <div>
                  <Label>Fade Out (seconds)</Label>
                  <Input type="number" placeholder="0" className="mt-2" />
                </div>
              </div>

              <div>
                <Label>Metadata Preservation</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="preserve-metadata" defaultChecked />
                  <label htmlFor="preserve-metadata" className="text-sm text-gray-700">
                    Keep original metadata (title, artist, album, etc.)
                  </label>
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
          className="flex-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Convert Audio Files
        </Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Clear All
        </Button>
      </div>
    </div>
  );
}