import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Open Sans", sans-serif;
  }

  body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
/* 
  :root {
--white-color: #fff;
--blue-color: #4070f4;
--grey-color: #707070;
--grey-color-light: #aaa;
 }
 body {
   background-color: #e7f2fd;
   transition: all 0.5s ease;
 }
 body.dark {
   background-color: #333;
 }
 body.dark {
   --white-color: #333;
   --blue-color: #fff;
   --grey-color: #f2f2f2;
   --grey-color-light: #aaa;
 } */

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
