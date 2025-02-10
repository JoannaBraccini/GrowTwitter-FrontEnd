import { FooterStyle } from "./FooterStyle";

export function Footer() {
  const year: number = new Date().getFullYear();
  return (
    <FooterStyle>
      <p>GrowTwitter - Trabalho final do módulo intermediário</p>
      <p>
        Criado por Joanna Braccini &copy;
        <a href="http://www.growdev.com.br" target="_blank">
          {" "}
          Growdev
        </a>{" "}
        - {year}
      </p>
    </FooterStyle>
  );
}
