import { Api } from "../Helpers/Endpoints/Api";
import { endpoint } from "../Helpers/Endpoints/Endpoints";
import {
  Product,
  ProductUpdate,
} from "../components/Api/Jogos";

export const CategoriasServices = {
  getLista: (): Promise<any> =>
    Api(endpoint.listCategoria(), {
      method: "GET",
    }).then((response) => response.json()),

  create: (product: Product) =>
    Api(endpoint.createCategoria(), {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  getById: (id: string) =>
    Api(endpoint.categoriaById(id), {
      method: "GET",
    }).then((response) => response.json()),

  updateById: ({ product, id }: ProductUpdate) =>
    Api(endpoint.updateCategoriaById(id), {
      method: "PUT",
      body: JSON.stringify(product),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  deleteById: (id: string) =>
    Api(endpoint.deleteCategoriaById(id), {
      method: "DELETE",
    }).then((response) => response.json()),
};
