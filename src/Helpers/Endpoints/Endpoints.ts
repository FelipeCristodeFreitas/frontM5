import { auth}  from "./Auth";
import { usuarios}  from "./Usuarios";
import { categorias }  from "./Categorias";
import { jogos}  from "./Jogos";


export const endpoint = {
  baseUrl: "https://m5-orpin.vercel.app",
  ...jogos,
  ...usuarios,
  ...categorias,
  ...auth,
};
