"use client";

import React, { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/FileUpload";
import ProgressBar from "@/components/ProgressBar";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export type ConversionType =
  | "pdf-to-word"
  | "word-to-pdf"
  | "image-to-word"
  | "word-to-image"
  | "excel-to-pdf"
  | "ppt-to-pdf";

interface ConversionTypeInfo {
  title: string;
  description: string;
  acceptedTypes: string[];
  outputFormat: string;
  maxFileSize?: number; // in MB
}

const conversionTypes: Record<ConversionType, ConversionTypeInfo> = {
  "pdf-to-word": {
    title: "PDF to Word",
    description: "Convert PDF files to editable Word documents",
    acceptedTypes: [".pdf"],
    outputFormat: ".docx",
    maxFileSize: 50,
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    acceptedTypes: [".doc", ".docx"],
    outputFormat: ".pdf",
    maxFileSize: 50,
  },
  "image-to-word": {
    title: "Image to Word",
    description: "Convert images to Word documents with OCR",
    acceptedTypes: [".png", ".jpg", ".jpeg"],
    outputFormat: ".docx",
    maxFileSize: 20,
  },
  "word-to-image": {
    title: "Word to Image",
    description: "Convert Word documents to image formats",
    acceptedTypes: [".doc", ".docx"],
    outputFormat: ".png",
    maxFileSize: 50,
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    acceptedTypes: [".xls", ".xlsx"],
    outputFormat: ".pdf",
    maxFileSize: 30,
  },
  "ppt-to-pdf": {
    title: "PPT to PDF",
    description: "Convert PowerPoint presentations to PDF",
    acceptedTypes: [".ppt", ".pptx"],
    outputFormat: ".pdf",
    maxFileSize: 50,
  },
};

interface ConvertedFile {
  name: string;
  url: string;
  originalName: string;
}

export default function ConversionPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { toast } = useToast();
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const unwrappedParams = React.use(params);
  const conversionType = unwrappedParams.type as ConversionType;
  const conversionInfo = conversionTypes[conversionType];

  if (!conversionInfo) {
    return (
      <div className="min-h-screen pt-20 pb-16 text-center">
        <h1 className="text-2xl font-bold text-destructive">
          Invalid conversion type
        </h1>
      </div>
    );
  }

  const handleFilesSelected = (files: File[]) => {
    // Check file sizes
    const maxSize = conversionInfo.maxFileSize || 50; // Default to 50MB if not specified
    const oversizedFiles = files.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      const errorMsg = `Some files exceed the maximum size of ${maxSize}MB: ${oversizedFiles
        .map((f) => f.name)
        .join(", ")}`;
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: "File size limit exceeded",
        description: errorMsg,
      });

      // Filter out oversized files
      const validFiles = files.filter(
        (file) => file.size <= maxSize * 1024 * 1024
      );
      setSelectedFiles(validFiles);

      if (validFiles.length > 0) {
        toast({
          title: "Valid files selected",
          description: `${validFiles.length} valid file(s) ready for conversion.`,
        });
      }
    } else {
      setSelectedFiles(files);
      setError(null);

      if (files.length > 0) {
        toast({
          title: "Files selected",
          description: `${files.length} file(s) ready for conversion.`,
        });
      }
    }

    setConvertedFiles([]);
    setStatus("");
    setProgress(0);
  };

  const handleConversion = async () => {
    if (selectedFiles.length === 0) {
      const errorMsg = "Please select at least one file to convert";
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: "No files selected",
        description: errorMsg,
      });
      return;
    }

    try {
      // Cancel any ongoing conversion
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController
      abortControllerRef.current = new AbortController();

      setConverting(true);
      setError(null);
      setProgress(0);
      setStatus("Starting conversion...");
      setConvertedFiles([]);

      toast({
        title: "Starting conversion",
        description: `Converting ${selectedFiles.length} file(s)...`,
      });

      // Prepare form data for API request
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("conversionType", conversionType);

      // Set up progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
        setStatus(`Converting file${selectedFiles.length > 1 ? "s" : ""}...`);
      }, 300);

      // Make the API request
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Conversion failed");
      }

      const result = await response.json();

      // Process the converted files
      const convertedFiles = result.files.map(
        (file: {
          data: string;
          convertedName: string;
          originalName: string;
        }) => {
          // Create a blob from the base64 data
          const byteCharacters = atob(file.data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray]);

          // Create a URL for the blob
          return {
            name: file.convertedName,
            originalName: file.originalName,
            url: URL.createObjectURL(blob),
          };
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      setStatus("Conversion complete!");
      setConvertedFiles(convertedFiles);

      toast({
        variant: "success",
        title: "Conversion complete",
        description: `Successfully converted ${convertedFiles.length} file(s).`,
      });
    } catch (error: Error | unknown) {
      console.error("Conversion error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Error during conversion";
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: errorMsg,
      });
      setStatus("Conversion failed");
    } finally {
      setConverting(false);
      abortControllerRef.current = null;
    }
  };

  const handleReset = () => {
    // Revoke object URLs to prevent memory leaks
    convertedFiles.forEach((file) => {
      URL.revokeObjectURL(file.url);
    });

    setSelectedFiles([]);
    setConvertedFiles([]);
    setStatus("");
    setProgress(0);
    setError(null);

    toast({
      title: "Reset complete",
      description: "Ready for a new conversion.",
    });
  };

  const handleDownload = (url: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Download started",
      description: `Downloading ${fileName}`,
    });
  };

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{conversionInfo.title}</h1>
          <p className="mt-2 text-muted-foreground">
            {conversionInfo.description}
          </p>
        </div>

        <div className="space-y-8">
          {convertedFiles.length === 0 && (
            <>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedFileTypes={conversionInfo.acceptedTypes}
                maxFiles={10}
                isDisabled={converting}
              />

              {conversionInfo.maxFileSize && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Maximum file size: {conversionInfo.maxFileSize}MB
                </p>
              )}
            </>
          )}

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          {selectedFiles.length > 0 &&
            !convertedFiles.length &&
            !converting && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleConversion}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Convert{" "}
                  {selectedFiles.length > 1
                    ? `${selectedFiles.length} Files`
                    : "File"}
                </button>
              </div>
            )}

          {converting && (
            <div className="mt-8">
              <ProgressBar
                progress={progress}
                status={status}
                error={!!error}
              />
            </div>
          )}

          {convertedFiles.length > 0 && (
            <div className="mt-8 space-y-6">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-4">Converted Files</h3>
                <ul className="space-y-3">
                  {convertedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-background rounded border"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[250px] sm:max-w-md">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Original: {file.originalName}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(file.url, file.name)}
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                        aria-label="Download file"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5 text-primary" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-2 border border-primary/30 text-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>Convert Another File</span>
                </button>
              </div>
            </div>
          )}

          {status && !converting && !convertedFiles.length && (
            <div className="mt-4 text-center text-sm font-medium">{status}</div>
          )}
        </div>
      </div>
    </main>
  );
}
