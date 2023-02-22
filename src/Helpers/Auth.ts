import { LocalStorageHelper } from "Helpers/LocalSotrageHelpres";
import { LocalStorageKeys } from "../components/LocalStorage/Storage";
import { RoutePath } from "../Router/routes";

export const Auth = {
  isAuth: (): boolean => {
    const token = LocalStorageHelper.get(LocalStorageKeys.TOKEN);
    const user = LocalStorageHelper.get(LocalStorageKeys.USER);

    return token !== null && user !== null;
  },
  logout: (): void => {
    LocalStorageHelper.clear();
    window.location.replace(RoutePath.HOME);
  },
};
