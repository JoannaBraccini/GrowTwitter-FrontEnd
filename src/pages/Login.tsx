import React from "react";
import { LoginStyle } from "../components/Login/LoginStyle";
import { Form } from "../components/Login/Form";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function Login() {
  const [signIn, toggle] = React.useState(true);
  return (
    <LoginStyle signinIn={signIn}>
      <div className="signup-container">
        <Form>
          <h1>Criar Conta</h1>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <Button>Cadastrar</Button>
        </Form>
      </div>

      <div className="signin-container">
        <Form>
          <h1>Entrar</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Link to="#">Esqueceu a senha?</Link>
          <Button>Entrar</Button>
        </Form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel left-overlay">
            <h1>Que bom ver você de novo!</h1>
            <p>Para entrar na sua conta, clique no botão abaixo</p>
            <Button ghost onClick={() => toggle(true)}>
              Entrar
            </Button>
          </div>

          <div className="overlay-panel right-overlay">
            <h1>Olá! Primeira vez aqui?</h1>
            <p>InForme seus dados e crie sua conta!</p>
            <Button ghost onClick={() => toggle(false)}>
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
}
