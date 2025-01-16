import { useState } from 'react';

type DeleteResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  deleteItem: (url: string) => Promise<void>;
};

export function useDelete<T>(): DeleteResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }

      const responseData: T = await response.json();
      setData(responseData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, deleteItem };
}
