
import React, {Children, useState} from 'react';

import FavoriteScreen from "./FavoriteScreen";
import { Jogos } from "components/TodosJogos/Interface";

interface favoritoContextProps {
  favorites: Jogos[];
  setFavorites: React.Dispatch<React.SetStateAction<Jogos[]>>;
}

const INITIAL_FAVORITES_VALUE: Jogos[] = [];

export const favoritoContext = React.createContext<favoritoContextProps>({
  favorites: INITIAL_FAVORITES_VALUE,
  setFavorites: () => console.warn("FavoritoProvider"),
});

type Props= {
  children?: JSX.Element | JSX.Element[];
}

export const FavoritoProvider: React.FC  <Props>= ({children}) => {
  const [favorites, setFavorites] = useState<Jogos[]>(INITIAL_FAVORITES_VALUE);
  return (
    <favoritoContext.Provider
      value={{
        favorites,
        setFavorites,
      }}

      >
{children}
      
    </favoritoContext.Provider>
  );
};

