import { useState } from 'react';
import { z } from 'zod';
import { userSchema, UserFormData } from '../utils/validation';

export type ValidationErrors = {
  [K in keyof typeof userSchema]: {
    [field: string]: string[];
  };
};

export function useFormValidation(userType: keyof typeof userSchema) {
  const [errors, setErrors] = useState<ValidationErrors[typeof userType]>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = async (data: any): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      await userSchema[userType].parseAsync(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { [field: string]: string[] } = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        setErrors(formattedErrors);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors[field]?.[0];
  };

  return {
    errors,
    isSubmitting,
    validate,
    getFieldError,
  };
}
