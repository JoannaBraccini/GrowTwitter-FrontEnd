export function Login() {
  return (
    <>
      <div className="main-login">
        <div className="title-text">
          <div className="title login">Entrar</div>
          <div className="title login">Cadastrar</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slider" id="login" checked />
            <input type="radio" name="slider" id="signup" />
            <label htmlFor="login" className="slide login">
              Entrar
            </label>
            <label htmlFor="signup" className="slide signup">
              Cadastrar
            </label>
            <div className="slide-tab"></div>
          </div>
          <div className="form-inner">
            <form action="" className="login">
              <div className="field">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu email..."
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Digite sua senha..."
                  required
                />
              </div>
              <div className="pass-link">
                <a href="#">Esqueceu a senha?</a>
              </div>
              <div className="field">
                <input type="submit" value="Entrar" className="spinner-btn" />
              </div>
              <div className="signup-link">
                Não tem conta? <a href="#">Cadastre-se</a>
              </div>
              {/**<div id="switch" onClick="toggleMode()"> */}
              <div id="switch">
                <button></button>
                <span></span>
              </div>
            </form>
            <form action="" className="signup">
              <div className="field">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email-sign"
                  id="email-sign"
                  placeholder="Digite seu email..."
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password-sign"
                  id="password-sign"
                  placeholder="Digite sua senha..."
                  required
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password-confirm"
                  id="password-confirm"
                  placeholder="Confirme sua senha..."
                  required
                />
              </div>
              <div className="field">
                <input
                  type="submit"
                  value="Cadastrar"
                  className="spinner-btn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
