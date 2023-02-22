import { auth}  from "./Auth";
import { usuarios}  from "./Usuarios";
import { jogos}  from "./Jogos";


export const endpoint = {
  baseUrl: "https://api-xbox-game.onrender.com",
  ...jogos,
  ...usuarios,
  ...auth,
};
