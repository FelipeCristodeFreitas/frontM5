import axios from "axios";
//import { error } from "console";
import { Environment } from "../environment";
import { responseIterceptor, errointerceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Environment.URL_BASE

});
Api.interceptors.response.use(
  (response) => responseIterceptor(response),
  (error) => errointerceptor(error)
);

export { Api };
    
