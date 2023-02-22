import { AuthContext } from "Auth/Context/AuthContext";
import { useContext } from "react";


const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
