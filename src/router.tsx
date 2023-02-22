import Usuarios from "components/Usuarios/Usuarios";
import FavoriteScreen from "Favoritos/contexts/FavoriteScreen";
import { Auth } from "Helpers/Auth";
import Cadastrar from "pages/Cadastrar/Cadastrar";
import CadastrarJogos from "pages/CadastrarJogos/CadastrarJogos";
import Home from "pages/Home/PaginaPrincipal";
import { Login } from "pages/login/Login";
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { RoutePath } from "./Router/routes";

/*
const AuthenticatedRoutes = () => {
  const isAuthenticated = Auth.isAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePath.HOME} />;
};
*/

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<Home />} />
      <Route path={RoutePath.FAVORITOS} element={<FavoriteScreen />} />
      <Route path={RoutePath.CADASTRAR_JOGOS} element={<CadastrarJogos />} />
      <Route path={RoutePath.USUARIOS} element={<Usuarios />} />
      <Route path="/Cadastrar" element={<Cadastrar />} />
    </Routes>
  );
};

export default Router;
