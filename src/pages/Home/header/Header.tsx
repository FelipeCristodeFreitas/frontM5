import {
  Badge,
  Button,
  Icon,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RoutePath } from "Router/routes";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import {
  BotãoSair,
  Cabecalho,
  Cadastrar,
  Favorito,
  ImgLogo,
  Logout1,
  MenuItemLogout,
  Pagina,
} from "./style";
import { AuthProvider, useAuthContext } from "Auth/Context/AuthContext";
import { AddTask, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { favoritoContext } from "Favoritos/contexts/FavoritoContext";
import CadastrarJogos from "pages/CadastrarJogos/CadastrarJogos";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "components/Api/QueryKey";
import { ProductService } from "Services/JogosServices";
import { OrderItemType } from "components/TodosJogos/OrderItemType";
import { Jogos } from "components/TodosJogos/Interface";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuthContext();
  const { data: jogosData } = useQuery(
    [QueryKey.JOGOS],
    ProductService.getLista
  );
  const [jogos, setJogos] = useState<Jogos[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { favorites } = useContext(favoritoContext);

  const favoritescont = favorites.length;

  const favorito = useNavigate();
  function handleclick() {
    favorito(`/favoritos`);
  }
  const cadastrar = useNavigate();
  function click() {
    cadastrar(`/cadastrarJogos`);
  }

useEffect(()=>{
  setJogos(jogosData || [] );
[jogosData]
});

  return (
    <header className={`${isScrolled && "bg-red-500"}`}>
      <AuthProvider>
        <Pagina>
          <header>
            <Cabecalho>
              <ImgLogo
                src="https://i.pinimg.com/736x/bf/21/de/bf21deeef128ed67160f9fddd520036b.jpg"
                alt=""
              />
              <BotãoSair>
                <ListItemButton onClick={logout}>
                  <ListItemText primary="Sair" />
                </ListItemButton>
              </BotãoSair>
              <Favorito>
                <div>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-haspopup="true"
                    onClick={() => favorito(`/favoritos`)}
                    color="inherit"
                  >
                    <Badge badgeContent={favoritescont} color="secondary">
                      <Favorite />
                    </Badge>
                  </IconButton>
                </div>
              </Favorito>
              <Cadastrar>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={() => cadastrar(`/cadastrarJogos`)}
                  color="inherit"
                >
                  <Badge>
                    <AddTask />
                  </Badge>
                  &nbsp;cadastrar
                </IconButton>
              </Cadastrar>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => cadastrar(`/gerenciarusuarios`)}
                color="inherit"
              >
                <Badge>
                  <AddTask />
                </Badge>
                &nbsp;cadastrar usuarios
              </IconButton>
            </Cabecalho>
          </header>
        </Pagina>
      </AuthProvider>
    </header>
  );
}

export default Header;
