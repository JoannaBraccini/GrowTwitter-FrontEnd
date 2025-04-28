import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --Poppins: "Poppins", sans-serif;
    --Montserrat: "Montserrat", sans-serif;
    --OpenSans: "Open Sans", sans-serif;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.accent};
        border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.backgroundColor};
      }
    }
    
    body {    
    display: flex;
    min-height: 100vh;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 10px;
    font-family: var(--OpenSans);
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    transition: all 0.3s ease;
    justify-content: space-between;
    

    &.sign-page {
      flex-direction: column;
      justify-content: center;
      align-items: center; 
      background-color: #eee;
      button {
        border-color: ${({ theme }) => theme.accent};
      }
    }    
  }

  a{
  text-decoration: none;
  color: ${({ theme }) => theme.accent}
  }

  input, textarea {
    font-family: var(--Poppins);
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    border: none;
    outline: none;  
    resize: none;
  }

  .layout-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
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
