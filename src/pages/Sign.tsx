import React, { useEffect, useState } from "react";
import { SignStyle } from "../components/Sign/SignStyle";
import { FormStyle } from "../components/Sign/FormStyle";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AlertToast } from "../components/AlertToast";
import { Loader } from "../components/Loader";
import { Footer } from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signupAsyncThunk } from "../store/modules/auth/signupSlice";
import { loginAsyncThunk } from "../store/modules/auth/loginSlice";
import { useValidate } from "../hooks";

export function Sign() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token,
    ok,
    loading: loginLoading,
  } = useAppSelector((state) => state.userLogged);
  const signupLoading = useAppSelector((state) => state.userSignup.loading);
  const loading = loginLoading || signupLoading;
  const { open } = useAppSelector((state) => state.alert);
  const [signIn, toggle] = React.useState(true);
  const [checked, setChecked] = useState(false);
  const { errors, validateLogin, validateSignup, validateField } =
    useValidate();

  useEffect(() => {
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add("sign-page");
    return () => {
      // Remove a classe do body quando o componente é desmontado
      document.body.classList.remove("sign-page");
    };
  }, []);

  // Formulario de Cadastro
  function handleSignupForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fullName = [
      e.currentTarget["first-name"].value,
      e.currentTarget.surname.value,
    ].join(" ");
    const user = {
      name: fullName,
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      passwordConfirm: e.currentTarget.passwordConfirm.value,
    };

    if (!validateSignup(user)) {
      return; // Não envia o formulário se houver erros
    }

    dispatch(signupAsyncThunk(user as Omit<typeof user, "passwordConfirm">))
      .unwrap()
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            e.currentTarget.reset();
            toggle(true);
          }, 500);
        }
      });
  }

  //Formulario de login
  function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let usernameOrEmail = event.currentTarget.username.value.trim();

    // Remove @ do início se o usuário digitou (ex: @silverleopard809 -> silverleopard809)
    if (usernameOrEmail.startsWith("@")) {
      usernameOrEmail = usernameOrEmail.substring(1);
    }

    // Detecta se é email (contém @ no meio, não apenas no início)
    const isEmail = usernameOrEmail.includes("@");

    const user = {
      email: isEmail ? usernameOrEmail : undefined,
      username: !isEmail ? usernameOrEmail : undefined,
      password: event.currentTarget.password.value,
      remember: checked, // Usa o estado checked que é boolean
    };

    if (!validateLogin(user)) {
      return; // Não envia o formulário se houver erros
    }

    dispatch(loginAsyncThunk(user));
  }

  // Validação em tempo real ao digitar
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, form } = e.target;
    validateField(name, value, { password: form?.password.value });
  };

  //controle de login
  useEffect(() => {
    if (token && ok) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }, [token, ok, navigate]);

  return (
    <SignStyle signingIn={signIn}>
      <h1 className="banner"> GrowTwitter </h1>
      <div className="signup-container">
        <FormStyle onSubmit={handleSignupForm}>
          <h1 style={{ color: "#3a3a3a" }}>Cadastrar</h1>
          <span className="mobile">Faça parte desta comunidade.</span>
          <div className="name-container">
            <div className="input-container">
              <input
                type="text"
                name="first-name"
                placeholder=""
                minLength={3}
                maxLength={20}
                required
                className={errors["first-name"] ? "error" : ""}
              />
              <label htmlFor="first-name">Nome</label>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="surname"
                placeholder=""
                minLength={3}
                maxLength={79}
                required
                className={errors.surname ? "error" : ""}
              />
              <label htmlFor="surname">Sobrenome</label>
            </div>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder=""
              minLength={3}
              maxLength={30}
              required
              className={errors.username ? "error" : ""}
            />
            <label htmlFor="username">Nome de usuário</label>
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder=""
              maxLength={50}
              required
              onChange={handleFieldChange}
              className={errors.email ? "error" : ""}
            />
            <label htmlFor="email">Seu melhor e-mail</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder=""
              minLength={4}
              maxLength={30}
              required
              onChange={handleFieldChange}
              className={errors.password ? "error" : ""}
            />
            <label htmlFor="password">Insira uma senha</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="passwordConfirm"
              placeholder=""
              minLength={4}
              maxLength={30}
              required
              onChange={handleFieldChange}
              className={errors.passwordConfirm ? "error" : ""}
            />
            <label htmlFor="passwordConfirm">Confirme a Senha</label>
          </div>
          <Button text="white" size="small" disabled={loading}>
            Cadastrar
          </Button>
          <p className="mobile">
            Já possiu conta? {""}
            <a type="button" onClick={() => toggle(true)}>
              Acesse
            </a>
          </p>
        </FormStyle>
      </div>

      <div className="signin-container">
        <FormStyle onSubmit={handleLoginForm}>
          <h1 style={{ color: "#3a3a3a" }}>Entrar</h1>
          <span className="mobile">
            A plataforma definitiva para todos os apaixonados por redes sociais
          </span>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder=""
              minLength={3}
              maxLength={50}
              className={errors.username ? "error" : ""}
              onChange={handleFieldChange}
            />
            <label htmlFor="username">E-mail ou nome de usuário</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder=""
              minLength={4}
              required
              className={errors.password ? "error" : ""}
            />
            <label htmlFor="password">Senha</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="remember"
              value={String(checked)}
              onChange={() => setChecked(!checked)}
            />
            <label>Lembrar</label>
          </div>
          <Button text="white" size="small" disabled={loading}>
            Entrar
          </Button>
          <p className="mobile">
            Não possui conta? {""}
            <a type="button" onClick={() => toggle(false)}>
              Cadastre-se
            </a>
          </p>
        </FormStyle>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel left-overlay">
            <h1>Que bom ver você de novo!</h1>
            <p>
              Growtwitter é a plataforma definitiva para todos os apaixonados
              por redes sociais que buscam uma experiência familiar e poderosa,
              semelhante ao Twitter, mas com um toque único.
            </p>
            <Button
              type="button"
              ghost
              size="small"
              text="white"
              onClick={() => toggle(true)}
            >
              Entre
            </Button>
          </div>

          <div className="overlay-panel right-overlay">
            <h1>Olá! Primeira vez aqui?</h1>
            <p>
              Faça parte desta comunidade que valoriza a liberdade de expressão,
              a conexão com pessoas de todo o mundo e a disseminação de ideias.
            </p>
            <Button
              type="button"
              ghost
              size="small"
              text="white"
              onClick={() => toggle(false)}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>
      <Loader />
      {/* Renderize o Toast quando o alerta estiver ativo */}
      {open && <AlertToast />}

      <Footer />
    </SignStyle>
  );
}
