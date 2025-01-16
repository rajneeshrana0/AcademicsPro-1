import { useState } from 'react';

type UploadResponse = {
  url: string;
  public_id: string;
};

type UseUploadReturn = {
  upload: (file: File, folder: string) => Promise<UploadResponse | null>;
  isUploading: boolean;
  error: string | null;
};

export const useUpload = (): UseUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, folder: string): Promise<UploadResponse | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder); // Include folder name

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }

      const data: UploadResponse = await response.json();
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};
