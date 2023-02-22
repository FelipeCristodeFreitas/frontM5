import ListaJogo from "components/ListaJogos/listaJogo";
//import { Jogos } from "components/TodosJogos/Interface";
import { Login } from "pages/login/Login";
import Header from "../header/Header";
import { Banner, Home1 } from "./style";

const Home = () => {
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
          </main>
        </div>
      </Home1>
    </Login>
  );

};
export default Home;
