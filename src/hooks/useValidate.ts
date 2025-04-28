/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

// Tipos de erro para o formulário
interface ValidationErrors {
  [key: string]: string;
}

export function useValidate() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Função para validar o email
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email inválido";
    }
    return "";
  };

  // Função para validar igualdade de senhas
  const validatePasswords = (
    password: string,
    passwordConfirm: string
  ): string => {
    return password === passwordConfirm ? "" : "As senhas não são iguais";
  };

  // Função genérica para validar campos comuns
  const validateCommonFields = (data: {
    email?: string;
    password?: string;
    passwordConfirm?: string;
  }) => {
    const newErrors: ValidationErrors = {};

    if (data.email) {
      const emailError = validateEmail(data.email);
      if (emailError) newErrors.email = emailError;
    }

    if (data.password && data.passwordConfirm) {
      const passwordsError = validatePasswords(
        data.password,
        data.passwordConfirm
      );
      if (passwordsError) newErrors.passwordConfirm = passwordsError;
    }

    return newErrors;
  };

  // Função para validar o campo com debounce
  const validateField = useCallback(
    (name: string, value: string, additionalFields: any = {}) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const newTimeout = setTimeout(() => {
        let error = "";
        switch (name) {
          case "email":
            error = validateEmail(value);
            break;
          case "passwordConfirm":
            error = validatePasswords(additionalFields.password, value);
            break;
          // Outras validações
          default:
            break;
        }

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      }, 500); // Atraso de 500ms

      setDebounceTimeout(newTimeout);
    },
    [debounceTimeout]
  );

  // Validação ao submeter o formulário de cadastro
  const validateSignup = (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const newErrors = validateCommonFields(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação ao submeter o formulário de login
  const validateLogin = (data: { email: string }) => {
    const newErrors = validateCommonFields(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateSignup,
    validateLogin,
    validateField,
  };
}
