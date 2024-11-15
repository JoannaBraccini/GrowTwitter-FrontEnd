import React from "react";
import { LoginStyle } from "../components/Login/LoginStyle";
import { FormStyle } from "../components/FormStyle";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function Login() {
  const [signIn, toggle] = React.useState(true);
  return (
    <LoginStyle signinIn={signIn}>
      <div className="title">
        <h1>GrowTwitter</h1>
        <span>Trabalho final do módulo intermediário</span>
      </div>
      <div className="signup-container">
        <FormStyle>
          <h1>Criar Conta</h1>
          <input type="text" placeholder="Nome" maxLength={100} required />
          <input type="text" placeholder="Username" maxLength={30} required />
          <input type="email" placeholder="E-mail" maxLength={50} required />
          <input type="password" placeholder="Senha" required />
          <input type="password" placeholder="Confirme a Senha" required />
          <Button>Cadastrar</Button>
        </FormStyle>
      </div>

      <div className="signin-container">
        <FormStyle>
          <h1>Entrar</h1>
          <input type="email" placeholder="Email" maxLength={50} />
          <input type="text" placeholder="Username" maxLength={30} />
          <input type="password" placeholder="Senha" required />
          <Link to="#">Esqueceu a senha?</Link>
          <Button>Entrar</Button>
        </FormStyle>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel left-overlay">
            <h1>Que bom ver você de novo!</h1>
            <p>
              O Growtwitter é a plataforma definitiva para todos os apaixonados
              por redes sociais que buscam uma experiência familiar e poderosa,
              semelhante ao Twitter, mas com um toque único.
            </p>
            <Button ghost onClick={() => toggle(true)}>
              Entre
            </Button>
          </div>

          <div className="overlay-panel right-overlay">
            <h1>Olá! Primeira vez aqui?</h1>
            <p>
              Seja parte desta comunidade que valoriza a liberdade de expressão,
              a conexão com pessoas de todo o mundo e a disseminação de ideias.
            </p>
            <Button ghost onClick={() => toggle(false)}>
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
}
