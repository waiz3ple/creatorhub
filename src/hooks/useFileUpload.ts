import { useCallback, useState } from 'react';
import { APP_CONFIG, ERROR_MESSAGES } from '../config/constants';

export const useFileUpload = (allowedTypes?: string[], maxSize?: number) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    const maxFileSize = maxSize || APP_CONFIG.maxFileSize;

    if (file.size > maxFileSize) {
      return ERROR_MESSAGES.fileTooBig;
    }

    if (allowedTypes) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        return ERROR_MESSAGES.unsupportedFormat;
      }
    }

    return null;
  }, [allowedTypes, maxSize]);

  const handleFileUpload = useCallback((selectedFiles: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(selectedFiles);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push(file);
    }

    setFiles(validFiles);
  }, [validateFile]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setError(null);
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  }, [handleFileUpload]);

  return {
    files,
    isDragging,
    error,
    handleFileUpload,
    removeFile,
    clearFiles,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop
    }
  };
};
