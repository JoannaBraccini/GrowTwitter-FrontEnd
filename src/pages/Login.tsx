import React, { useEffect, useState } from "react";
import { LoginStyle } from "../components/Login/LoginStyle";
import { FormStyle } from "../components/Login/FormStyle";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { login, signUp } from "../configs/services/auth.service";
import { ToastResponse } from "../components/Toast/Toast";
import { Toast } from "../types/toast";
import { Loader } from "../components/Loader/Loader";
import { Footer } from "../components/Footer/Footer";
import { Banner } from "../components/Login/Banner";

export function Login() {
  const navigate = useNavigate();
  const [signIn, toggle] = React.useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [toastProps, setToastProps] = useState<Toast>();
  const token = getToken();

  function showToast(type: "success" | "error", message: string) {
    setToastProps({ type, message, duration: 3000 });
  }

  const handleCloseToast = () => {
    setToastProps(undefined);
  };

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
    if (response.ok) setTimeout(() => navigate("/sign"), 500);
  }

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

    setLoading(false);
    if (!response.ok) {
      showToast("error", response.message);
      return;
    }

    if (checked) {
      localStorage.setItem("token", response.data!.token);
    }
    sessionStorage.setItem("token", response.data!.token);

    showToast("success", response.message);
    navigate("/feed");
  }

  useEffect(() => {
    if (token) {
      navigate("/feed");
      return;
    }
  }, [token, navigate]);

  return (
    <LoginStyle signinIn={signIn}>
      <Banner> GrowTwitter </Banner>
      <div className="signup-container">
        <FormStyle onSubmit={handleSignupForm}>
          <h1>Criar Conta</h1>
          <span className="mobile">Digite seus dados para se cadastrar</span>
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
          <Button disabled={loading}>Cadastrar</Button>
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
          <h1>Entrar</h1>
          <span className="mobile">Use seu e-mail ou username para entrar</span>
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
          <Button disabled={loading}>Entrar</Button>
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
            <Button type="button" ghost onClick={() => toggle(true)}>
              Entre
            </Button>
          </div>

          <div className="overlay-panel right-overlay">
            <h1>Olá! Primeira vez aqui?</h1>
            <p>
              Seja parte desta comunidade que valoriza a liberdade de expressão,
              a conexão com pessoas de todo o mundo e a disseminação de ideias.
            </p>
            <Button type="button" ghost onClick={() => toggle(false)}>
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>
      <Loader isLoading={loading} message="Aguarde..." />
      {toastProps && (
        <ToastResponse
          message={toastProps.message}
          duration={toastProps.duration}
          type={toastProps.type}
          onClose={handleCloseToast}
        />
      )}
      <Footer />
    </LoginStyle>
  );
}
