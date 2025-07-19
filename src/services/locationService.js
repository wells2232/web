import axios from 'axios';

const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export const fetchStates = async () => {
  const { data } = await ibgeApi.get('/estados?orderBy=nome');
  return data; // Retorna array de estados [{ id, sigla, nome }]
};

export const fetchCitiesByState = async (stateUf) => {
  if (!stateUf) {
    return []; // Não busca se nenhum estado for selecionado
  }
  const { data } = await ibgeApi.get(`/estados/${stateUf}/municipios`);
  return data; // Retorna array de cidades [{ id, nome }]
};
