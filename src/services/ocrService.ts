import axios from "axios";

export interface OcrResponse {
  success: boolean;
  message: string;
  data: {
    fileName: string;
    fileType: string;
    text: string;
    structuredData: {
      pages?: number;
      info?: {
        title: string | null;
        author: string | null;
        subject: string | null;
        keywords: string | null;
        creationDate: string | null;
      };
      confidence?: number;
      lineCount?: number;
      emails?: string[];
      phones?: string[];
      dates?: string[];
      potentialAmounts?: string[];
      headings?: string[];
      extractedData?: {
        lineCount?: number;
        emails?: string[];
        phones?: string[];
        dates?: string[];
        potentialAmounts?: string[];
        headings?: string[];
      };
      sheetNames?: string[];
      totalSheets?: number;
      sheets?: Record<string, {
        headers: string[];
        rowCount: number;
        data: Record<string, unknown>[];
      }>;
    };
    wordCount: number;
    charCount: number;
  };
}

export const uploadAndExtractOcr = async (file: File): Promise<OcrResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post<OcrResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ocr/extract`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      timeout: 60000,
    },
  );

  return res.data;
};
