import { useState } from "react";

interface FormDataProps {
  url: string;  
  formData: FormData;  
}

export const useFormData = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitForm = async ({ url, formData }: FormDataProps) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        const data = await res.json();
        setSuccess(data.message || "Form submitted successfully!");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to connect to the server.");
    }
    setIsSubmitting(false);
  };

  return { isSubmitting, error, success, submitForm };
};
