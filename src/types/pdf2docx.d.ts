declare module 'pdf2docx' {
  export interface ConvertOptions {
    pageRange?: string[];
    encoding?: string;
  }

  export class Converter {
    constructor(pdfPath: string);
    convert(docxPath: string, options?: ConvertOptions): Promise<boolean>;
    convertBuffer(options?: ConvertOptions): Promise<Buffer>;
  }
}