import { AuthProvider } from "Auth/Context/AuthContext";

import ListaJogo from "components/ListaJogos/listaJogo";
import { Jogos } from "components/TodosJogos/Interface";
import { products } from "mock/JogosItens";
import { Login } from "pages/login/Login";


import Header from "../header/Header";
import { Banner, Home1 } from "./style";

const Home = () => {
  const handleSelection = (product: Jogos) => {};
  return (
 
        <Login>


        <Home1>
          <div>
            <Header />

            <main>
              <div className="card"></div>

              <Banner>
                <ListaJogo>

                </ListaJogo>
              </Banner>
              <section></section>
             
            </main>
          </div>
        </Home1>
 
    
    
        </Login>
  );
  
};
export default Home;
