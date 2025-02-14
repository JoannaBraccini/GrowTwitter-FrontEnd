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

    const user = {
      email: event.currentTarget.email.value,
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      remember: event.currentTarget.remember.value,
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
        navigate("/feed");
      }, 1000);
    }
  }, [token, ok, navigate]);

  return (
    <SignStyle signinIn={signIn}>
      <h1 className="banner"> GrowTwitter </h1>
      <div className="signup-container">
        <FormStyle onSubmit={handleSignupForm}>
          <h1 style={{ color: "#3a3a3a" }}>Primeira vez aqui?</h1>
          <span className="mobile">Faça parte desta comunidade.</span>
          <div className="name-container">
            <input
              type="text"
              name="first-name"
              placeholder="Nome"
              minLength={3}
              maxLength={20}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Sobrenome"
              minLength={3}
              maxLength={79}
              required
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            minLength={3}
            maxLength={30}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu melhor e-mail"
            maxLength={50}
            required
            onChange={handleFieldChange}
          />
          <div className="error-message">{errors.email || " "}</div>
          <input
            type="password"
            name="password"
            placeholder="Insira uma senha"
            minLength={4}
            maxLength={30}
            required
            onChange={handleFieldChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirme a Senha"
            minLength={4}
            maxLength={30}
            required
            onChange={handleFieldChange}
          />
          <div className="error-message">{errors.passwordConfirm || " "}</div>
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
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            maxLength={50}
          />
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            minLength={3}
            maxLength={30}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            minLength={4}
            required
          />
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
            Não possiu conta? {""}
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
