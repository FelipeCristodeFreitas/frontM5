import React, {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../Service/AuthService";

interface IAuthContextData {
  cadastrar: (email: string, password: string) => string |void;
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
}



 export const  AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAcessToken,] = useState<string>();
  
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      setAcessToken(accessToken);
    } else {
      setAcessToken(undefined);
    }
  }, []);



  
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    console.log(result, "teste")
    if (result instanceof Error) {
      return result.message;
    } else {
      
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCESS_TOKEN,

   "teste"
      );
      
      setAcessToken(result.accessToken);
    }
   
  }, []);



  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAcessToken(undefined);
  }, []);
  
   const cadastrar = (email:any,  password:any) => {
     const usersStorage = localStorage.getItem("user_token");
  
     const userarray = usersStorage? JSON.parse(usersStorage):[]

     const usuario = userarray?.filter((user: any) => user.email === email);
 console.log(email, "email")
  
   };
   

  // recupera use token, useMemo !! negar o valor da string e igual acessToken !== undefined
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        cadastrar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthContext);
