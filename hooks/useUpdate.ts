import { useState } from 'react';

type UpdateResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  update: (url: string, body: Partial<T> | T, method?: 'PUT' | 'PATCH') => Promise<void>;
};

export function useUpdate<T>(): UpdateResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (url: string, body: Partial<T> | T, method: 'PUT' | 'PATCH' = 'PATCH') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
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

  return { data, isLoading, error, update };
}
