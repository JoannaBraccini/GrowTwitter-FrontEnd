/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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

  // Função para validar o username (apenas letras e números)
  const validateUsername = (username: string): string => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      return "Username deve conter apenas letras e números";
    }
    if (username.length < 3) {
      return "Username deve ter pelo menos 3 caracteres";
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
    username?: string;
    password?: string;
    passwordConfirm?: string;
  }) => {
    const newErrors: ValidationErrors = {};

    if (data.email) {
      const emailError = validateEmail(data.email);
      if (emailError) newErrors.email = emailError;
    }

    if (data.username) {
      const usernameError = validateUsername(data.username);
      if (usernameError) newErrors.username = usernameError;
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
  const validateField = (
    name: string,
    value: string,
    additionalFields: any = {}
  ) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      let error = "";
      switch (name) {
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = "Email inválido";
          }
          break;
        }
        case "username": {
          const usernameRegex = /^[a-zA-Z0-9]+$/;
          if (!usernameRegex.test(value)) {
            error = "Username deve conter apenas letras e números";
          } else if (value.length < 3) {
            error = "Username deve ter pelo menos 3 caracteres";
          }
          break;
        }
        case "passwordConfirm": {
          if (additionalFields.password !== value) {
            error = "As senhas não são iguais";
          }
          break;
        }
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
  };

  // Validação ao submeter o formulário de cadastro
  const validateSignup = (data: {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const newErrors = validateCommonFields(data);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação ao submeter o formulário de login
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateLogin = (_data: { email?: string; username?: string }) => {
    // Para login, não validamos o formato de email/username pois pode ser qualquer um dos dois
    // A validação real será feita no backend
    return true;
  };

  return {
    errors,
    validateSignup,
    validateLogin,
    validateField,
  };
}
