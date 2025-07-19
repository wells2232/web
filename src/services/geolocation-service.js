import axios from 'axios';

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const OPENCAGE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export const reverseGeocode = async (lat, lon) => {
  try {
    const { data } = await axios.get(OPENCAGE_URL, {
      params: {
        key: OPENCAGE_API_KEY,
        q: `${lat}+${lon}`, // Formato de coordenadas
        language: 'pt-BR', // Para resultados em português
      },
    });

    if (data.results && data.results.length > 0) {
      const components = data.results[0].components;
      return {
        city: components.city || components.town || components.village,
        state: components['ISO_3166-1_alpha-2'].replace('BR-', ''), // Retorna a sigla do estado, ex: 'SP'
      };
    }
    throw new Error(
      'Não foi possível determinar a localização a partir das coordenadas.'
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <>
    console.error('Erro na geocodificação reversa:', error);
    throw error;
  }
};
