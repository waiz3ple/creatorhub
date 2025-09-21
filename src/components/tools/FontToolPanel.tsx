import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Upload,
  Download,
  Type,
  Globe,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export function FontToolPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState("woff2");
  const [subsetting, setSubsetting] = useState(false);
  const [unicodeRanges, setUnicodeRanges] = useState("");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleConvert = () => {
    alert(
      `Converting ${files.length} font file(s) to ${outputFormat.toUpperCase()}`,
    );
  };

  const formats = [
    {
      value: "woff2",
      label: "WOFF2",
      description: "Best compression",
    },
    {
      value: "woff",
      label: "WOFF",
      description: "Good compatibility",
    },
    {
      value: "ttf",
      label: "TTF",
      description: "Universal support",
    },
    {
      value: "otf",
      label: "OTF",
      description: "OpenType features",
    },
  ];

  const presetRanges = [
    { label: "Latin Basic", value: "U+0020-007F" },
    {
      label: "Latin Extended",
      value: "U+0020-007F,U+00A0-00FF,U+0100-017F",
    },
    { label: "Cyrillic", value: "U+0400-04FF" },
    { label: "Greek", value: "U+0370-03FF" },
    { label: "Arabic", value: "U+0600-06FF" },
  ];

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            Upload Font Files
          </h3>
          <p className="text-orange-600 mb-4">
            Select TTF, OTF, WOFF, or other font formats
          </p>

          <Input
            type="file"
            multiple
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFileUpload}
            className="w-full max-w-md mx-auto"
          />

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/60 rounded-lg"
            >
              <p className="text-sm text-orange-700">
                {files.length} font file(s) selected
              </p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Conversion Options */}
      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="format"
            className="flex items-center space-x-2"
          >
            <Type className="h-4 w-4" />
            <span>Format</span>
          </TabsTrigger>
          <TabsTrigger
            value="optimize"
            className="flex items-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>Optimize</span>
          </TabsTrigger>
          <TabsTrigger
            value="subset"
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Subset</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formats.map((format, index) => (
              <motion.div
                key={format.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    outputFormat === format.value
                      ? "ring-2 ring-orange-500 bg-orange-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setOutputFormat(format.value)}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800">
                      {format.label}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {format.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">
              Web Optimization
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remove-hints"
                  defaultChecked
                />
                <label
                  htmlFor="remove-hints"
                  className="text-sm text-gray-700"
                >
                  Remove TrueType hints (reduces file size)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="optimize-tables"
                  defaultChecked
                />
                <label
                  htmlFor="optimize-tables"
                  className="text-sm text-gray-700"
                >
                  Optimize font tables
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remove-unused"
                  defaultChecked
                />
                <label
                  htmlFor="remove-unused"
                  className="text-sm text-gray-700"
                >
                  Remove unused glyphs
                </label>
              </div>

              <div>
                <Label>Compression Level</Label>
                <Select defaultValue="maximum">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No Compression
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard
                    </SelectItem>
                    <SelectItem value="maximum">
                      Maximum
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="subset" className="space-y-4">
          <Card className="p-6">
            <h4 className="font-semibold mb-4">
              Font Subsetting
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enable-subsetting"
                  checked={subsetting}
                  onChange={(e) =>
                    setSubsetting(e.target.checked)
                  }
                />
                <label
                  htmlFor="enable-subsetting"
                  className="text-sm text-gray-700"
                >
                  Enable font subsetting (include only specific
                  characters)
                </label>
              </div>

              {subsetting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Unicode Ranges</Label>
                    <Input
                      value={unicodeRanges}
                      onChange={(e) =>
                        setUnicodeRanges(e.target.value)
                      }
                      placeholder="U+0020-007F,U+00A0-00FF"
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter comma-separated Unicode ranges
                    </p>
                  </div>

                  <div>
                    <Label>Preset Character Sets</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {presetRanges.map((preset) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setUnicodeRanges(preset.value)
                          }
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Custom Text</Label>
                    <textarea
                      placeholder="Enter custom text to include only those characters"
                      className="w-full mt-2 p-2 border rounded-md resize-none"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Only characters used in this text will be
                      included
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={handleConvert}
          disabled={files.length === 0}
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Convert Fonts
        </Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Clear All
        </Button>
      </div>
    </div>
  );
}