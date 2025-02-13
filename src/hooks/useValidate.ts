import { useState } from "react";

// Tipos de erro para o formulário
interface ValidationErrors {
  [key: string]: string;
}

export function useValidate() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Função para validar o email
  const validateEmail = (email: string): string | null => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? null : "Email inválido";
  };

  // Função para validar igualdade de senhas
  const validatePasswords = (
    password: string,
    passwordConfirm: string
  ): string | null => {
    return password === passwordConfirm ? null : "As senhas não são iguais";
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

  // Validação em tempo real ao preencher os campos
  const validateField = (
    name: string,
    value: string,
    formData?: { password?: string }
  ) => {
    let error = "";

    if (name === "email") error = validateEmail(value) || "";
    if (name === "passwordConfirm" && formData?.password) {
      error = validatePasswords(formData.password, value) || "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return {
    errors,
    validateSignup,
    validateLogin,
    validateField,
  };
}
