import { auth}  from "./Auth";
import { usuarios}  from "./Usuarios";
import { categorias }  from "./Categorias";
import { jogos}  from "./Jogos";


export const endpoint = {
  baseUrl: "http://localhost:3333",
  ...jogos,
  ...usuarios,
  ...categorias,
  ...auth,
};
