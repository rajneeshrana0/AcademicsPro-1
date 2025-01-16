import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PostState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

type PostOptions = {
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

export const usePost = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (url: string, options: PostOptions = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(options.body || {}),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, post };
};
