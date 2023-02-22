import { endpoint } from "./Endpoints";

export const jogos= {
  createJogos:  () => `${endpoint.baseUrl}/games`,
  listJogos: () => `${endpoint.baseUrl}/games`,
  jogoById: (id: string) => `${endpoint.baseUrl}/games/${id}`,
  updateById: (id: string) => `${endpoint.baseUrl}/games/${id}`,
  deleteById: (id: string) => `${endpoint.baseUrl}/games/${id}`,
};
