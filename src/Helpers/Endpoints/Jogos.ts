import { endpoint } from "./Endpoints";

export const jogos= {
  createJogos:  () => `${endpoint.baseUrl}/Jogos/create`,
  listJogos: () => `${endpoint.baseUrl}/Jogos/todos-jogos`,
  jogoById: (id: string) => `${endpoint.baseUrl}/Jogos/jogo${id}`,
  updateById: (id: string) => `${endpoint.baseUrl}/Jogos/update/{id}`,
  deleteById: (id: string) => `${endpoint.baseUrl}/Jogos/delete/{id}`,
};
