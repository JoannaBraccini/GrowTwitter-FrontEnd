import axios from "axios";
import { Trend } from "../../types/trends.type";

export const fetchTrendsFromAPI = async (): Promise<Trend[]> => {
  try {
    // Fazer a requisição para o site
    const { data } = await axios.get("https://trends24.in/brazil/");

    // Usar DOMParser para processar o HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    // Extrair as tendências (links com o href começando com /brazil/)
    const trendElements = doc.querySelectorAll(
      "tend-card .trend-card__list li"
    );
    const trendsData: Trend[] = Array.from(trendElements).map((el) => {
      const categoryElement = el.querySelector(".trend-card__list-item-label");
      const topicElement = el.querySelector(".trend-card__list-item-title");
      const tweetCountElement = el.querySelector(
        ".trend-card__list-item-tweet-count"
      );

      const category =
        categoryElement?.textContent?.trim() ?? "Categoria desconhecida";
      const topic = topicElement?.textContent?.trim() ?? "Tópico desconhecido";
      const tweetCount = tweetCountElement?.textContent?.trim() ?? "0 posts";

      return { category, topic, posts: tweetCount };
    });

    return trendsData;
  } catch (error) {
    console.error("Erro ao buscar trends:", error);
    return [];
  }
};
