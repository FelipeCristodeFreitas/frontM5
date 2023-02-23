import { Api } from "../Helpers/Endpoints/Api";
import { endpoint } from "../Helpers/Endpoints/Endpoints";
import {
  Product,
  ProductUpdate
} from "../components/Api/Jogos";

export const ProductService = {
  getLista: (): Promise<any> =>
    Api(endpoint.listJogos(), {
      method: "GET"
    }).then((response) => response.json()),

  create: (product: Product) =>
    Api(endpoint.createJogos(), {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).catch(e => {
      console.log(JSON.stringify(product),);
    }),

  getById: (id: string) =>
    Api(endpoint.jogoById(id), {
      method: "GET"
    }).then((response) => response.json()),

  updateById: ({ product, id }: ProductUpdate) =>
    Api(endpoint.updateById(id), {
      method: "PATCH",
      body: JSON.stringify(product),
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()),

  deleteById: (id: string) =>
    Api(endpoint.deleteById(id), {
      method: "DELETE"
    }).then((response) => response.json())
};
