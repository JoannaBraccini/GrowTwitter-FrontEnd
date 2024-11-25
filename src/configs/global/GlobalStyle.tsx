import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ isSignPage: boolean }>`
:root {
  --Poppins: "Poppins", sans-serif;
  --Montserrat: "Montserrat", sans-serif;
  --OpenSans: "Open Sans", sans-serif;
}

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    //sign é != do default
    body {
      font-family: var(--OpenSans);
      background: #f6f5f7;
      display: flex;
      height: 100vh;
      ${(props) =>
        props.isSignPage
          ? `
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `
          : `
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 10px;
        `}
  }

`;
/**
 Open Sans:
Texto Principal e Parágrafos: É uma fonte altamente legível e neutra, ideal para grandes blocos de texto.
Elementos de Navegação: Funciona bem em menus e barras de navegação, proporcionando clareza.

Montserrat:
Títulos e Subtítulos: Use para títulos, cabeçalhos e subcabeçalhos. A fonte Montserrat tem um visual distinto que destaca bem os textos importantes.
Botões e Chamadas para Ação (CTAs): Ideal para botões e CTAs devido à sua aparência impactante.

Poppins:
Elementos Destacados e Citações: Use Poppins para citações, destaques ou quaisquer textos que você queira que se destaquem.
Legendas e Rótulos: Ótima para legendas, rótulos de formulário e pequenos textos informativos.
 */
