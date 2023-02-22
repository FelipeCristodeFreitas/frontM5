import { endpoint } from "./Endpoints";
export const auth = {
  auth: () => `${endpoint.baseUrl}/auth/login`,
};