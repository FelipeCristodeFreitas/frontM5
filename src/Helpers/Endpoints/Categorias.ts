import { endpoint } from "./Endpoints";

export const categorias = {
  createCategoria:  () => `${endpoint.baseUrl}/genres`,
  listCategoria: () => `${endpoint.baseUrl}/genres`,
  categoriaById: (id: string) => `${endpoint.baseUrl}/genres/${id}`,
  updateCategoriaById: (id: string) => `${endpoint.baseUrl}/genres/${id}`,
  deleteCategoriaById: (id: string) => `${endpoint.baseUrl}/genres/${id}`,
};
