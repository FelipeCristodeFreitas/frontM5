import { Api } from "../Helpers/Endpoints/Api";
import { endpoint } from "../Helpers/Endpoints/Endpoints";
import { ErrorResponse } from "../components/Api/Error";

import { Login, LoginResponse } from "../components/Api/Login";

import { User } from "../components/Api/Users";

export const AuthService = {
  login: (loginData: Login): Promise<LoginResponse & ErrorResponse> =>
    Api(endpoint.auth(), {
      method: "POST",
      body: JSON.stringify(loginData),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  me: (): Promise<User> =>
    Api(endpoint.auth(), { method: "GET" }).then((response) => response.json()),
};
