import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes: string[];
  maxFiles?: number;
  isDisabled?: boolean;
}

export default function FileUpload({
  onFilesSelected,
  acceptedFileTypes,
  maxFiles = 1,
  isDisabled = false
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isDisabled,
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        } ${files.length > 0 ? 'border-primary/50' : ''} ${
          isDisabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <ArrowUpTrayIcon className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop the files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select files
            </p>
            <p className="text-xs text-muted-foreground">
              Accepted formats: {acceptedFileTypes.join(', ')}
            </p>
            {maxFiles > 1 && (
              <p className="text-xs text-muted-foreground">
                You can upload up to {maxFiles} files
              </p>
            )}
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 bg-card rounded-lg border p-4">
          <h4 className="text-sm font-medium mb-3">Selected files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={file.name} className="flex items-center justify-between p-2 bg-background rounded border">
                <div className="flex items-center space-x-2">
                  <DocumentIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm truncate max-w-[250px] sm:max-w-md">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className={`p-1 rounded-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary'}`}
                  aria-label="Remove file"
                  disabled={isDisabled}
                >
                  <XMarkIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}