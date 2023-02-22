import { Api } from "../../axios/axios";

interface Iauth {
  accessToken: string;
}

const auth = async (
  email: string,
  password: string
): Promise<Iauth | Error> => {
  try {
    const { data } = await Api.get("/", { data: { email, password } });

    if (data) {
      return data;
    }

    return new Error("Erro ao fazer login.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};
export const AuthService = {
  auth,
};
