import { Jogos } from "../TodosJogos/Interface";

export interface OrderItemType {
  product: Jogos;
  quantity: number;
  observation?: string;
}
