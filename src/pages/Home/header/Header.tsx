import {
  Badge,
  AppBar,
  Container,
  IconButton,
  ListItemButton,
  Typography,
  Box,
  ListItem,
  ListItemText
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Pagina
} from "./style";
import { AuthProvider, useAuthContext } from "Auth/Context/AuthContext";
import { AddTask, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { favoritoContext } from "Favoritos/contexts/FavoritoContext";
//import CadastrarJogos from "pages/CadastrarJogos/CadastrarJogos";
//import { useQuery } from "@tanstack/react-query";
//import { QueryKey } from "components/Api/QueryKey";
//import { ProductService } from "Services/JogosServices";
//import { OrderItemType } from "components/TodosJogos/OrderItemType";
//import { Jogos } from "components/TodosJogos/Interface";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuthContext();
  /*const { data: jogosData } = useQuery(
    [QueryKey.JOGOS],
    ProductService.getLista
  );*/

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

  const cadastrar = useNavigate();

  /*useEffect(()=>{
    setJogos(null || jogosData);
  });*/

  return (
    <header className={`${isScrolled && "bg-red-500"}`}>
      <AuthProvider>
        <Pagina>
          <AppBar>
            <Container maxWidth="xl">

              <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
                <ListItem>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none"
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/736x/bf/21/de/bf21deeef128ed67160f9fddd520036b.jpg"
                      style={{ width: "70px" }}
                      alt=""
                    />
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={logout}>
                    <ListItemText primary="Sair" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
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
                </ListItem>
                <ListItem>
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
                </ListItem>
                <ListItem>
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
                </ListItem>
              </Box>
            </Container>
          </AppBar>
        </Pagina>
      </AuthProvider>
    </header>
  );
}

export default Header;
