import React, { useEffect, useState } from "react";
import { SignStyle } from "../components/Sign/SignStyle";
import { FormStyle } from "../components/Sign/FormStyle";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { login, signUp } from "../configs/services/auth.service";
import { ToastResponse } from "../components/Toast";
import { Toast } from "../types/toast";
import { Loader } from "../components/Loader";
import { Footer } from "../components/Footer";
import { useLoading } from "../utils/loading";

export function Sign() {
  const navigate = useNavigate();
  const [signIn, toggle] = React.useState(true);
  const [checked, setChecked] = useState(false);
  const [toastProps, setToastProps] = useState<Toast>();

  const { loading, loaderMessage, setLoading } = useLoading();
  const token = getToken();

  useEffect(() => {
    // Adiciona a classe ao body quando o componente é montado
    document.body.classList.add("sign-page");
    return () => {
      // Remove a classe do body quando o componente é desmontado
      document.body.classList.remove("sign-page");
    };
  }, []);

  function showToast(type: "success" | "error", message: string) {
    setToastProps({ type, message, duration: 3000 });
  }

  const handleCloseToast = () => {
    setToastProps(undefined);
  };

  // Formulario de Cadastro
  async function handleSignupForm(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const user = {
      name: e.currentTarget.uname.value,
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const passwordConfirm = e.currentTarget.passwordConfirm.value;

    if (user.password !== passwordConfirm) {
      showToast("error", "As senhas não são iguais!");
      setLoading(false);
      return;
    }

    const response = await signUp(user);
    setLoading(false);

    showToast(response.ok ? "success" : "error", response.message);
    if (response.ok)
      setTimeout(() => {
        e.currentTarget.reset();
        toggle(true);
      }, 500);
  }

  //Formulario de login
  async function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const user = {
      email: event.currentTarget.email.value,
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    if (!user.email && !user.username) {
      showToast("error", "E-mail ou username necessários");
      setLoading(false);
      return;
    }

    const response = await login(user);

    if (!response || !response.ok) {
      showToast(
        "error",
        response?.message || "Ocorreu um erro. Tente novamente mais tarde."
      );
      setLoading(false);
      return;
    }

    if (response.data) {
      const userData = response.data;
      const user = {
        token: userData.token,
        username: userData.username,
        name: userData.name,
      };

      //salvar os dados do usuário no storage
      if (checked) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      sessionStorage.setItem("user", JSON.stringify(user));

      showToast("success", response.message);
      navigate("/feed");
    } else {
      showToast("error", "Resposta inválida do servidor.");
    }
    setLoading(false);
  }

  //controle de login
  useEffect(() => {
    if (token) {
      navigate("/feed");
      return;
    }
  }, [token, navigate]);

  return (
    <SignStyle signinIn={signIn}>
      <h1 className="banner"> GrowTwitter </h1>
      <div className="signup-container">
        <FormStyle onSubmit={handleSignupForm}>
          <h1 style={{ color: "#3a3a3a" }}>Primeira vez aqui?</h1>
          <span className="mobile">Faça parte desta comunidade.</span>
          <input
            type="text"
            name="uname"
            placeholder="Nome"
            maxLength={100}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            maxLength={30}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            maxLength={50}
            required
          />
          <input type="password" name="password" placeholder="Senha" required />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirme a Senha"
            required
          />
          <Button size="small" disabled={loading}>
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
            maxLength={30}
          />
          <input type="password" name="password" placeholder="Senha" required />
          <div className="checkbox">
            <input
              type="checkbox"
              value={String(checked)}
              onChange={() => setChecked(!checked)}
            />
            <label>Lembrar</label>
          </div>
          <Button size="small" disabled={loading}>
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
              onClick={() => toggle(false)}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>
      <Loader isLoading={loading} message={loaderMessage} />
      {toastProps && (
        <ToastResponse
          message={toastProps.message}
          duration={toastProps.duration}
          type={toastProps.type}
          onClose={handleCloseToast}
        />
      )}
      <Footer />
    </SignStyle>
  );
}
