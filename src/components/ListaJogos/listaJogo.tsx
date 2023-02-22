import { JogosItem } from "components/JogoItem/JogoItem";
import { Jogos } from "components/TodosJogos/Interface";
import { products } from "mock/JogosItens";
import React, { useEffect, useState } from "react";
import { ProductService } from "Services/JogosServices";
import {
  Button,
  Card,
  Categoria,
  ListaJogoHeader,
  ListaJogoTitle
} from "./style";


interface ListaJogoProps {
  children: React.ReactNode;
}

function ListaJogo({ children }: ListaJogoProps) {
  const [produtos, definirProdutos] = useState(products);
  const handleSelection = (product: Jogos) => {
  };

  function filtrarPorCategoria(categoria: any) {
    const resultadoDoFiltro = products.filter(
      (product) => product.categoria === categoria
    );

    definirProdutos(resultadoDoFiltro);
  }

  const todosJogos = () => {
    ProductService.getLista().then((listajogos) =>
      definirProdutos(listajogos)
    );
  };
  useEffect(() => {
    todosJogos();

  }, []);

  return (
    <section>
      <ListaJogoHeader>
        <ListaJogoTitle>
          <div>
            <Categoria>
              <Button
                onClick={() => {
                  todosJogos();
                }}
              >
                {" "}
                Todos{" "}
              </Button>
              <Button
                onClick={() => {
                  filtrarPorCategoria("luta");
                }}
              >
                {" "}
                luta{" "}
              </Button>
              <Button
                onClick={() => {
                  filtrarPorCategoria("Ação");
                }}
              >
                {" "}
                Ação{" "}
              </Button>
              <Button
                onClick={() => {
                  filtrarPorCategoria("corrida");
                }}
              >
                {" "}
                corrida{" "}
              </Button>

              <Button
                onClick={() => {
                  filtrarPorCategoria("futebol");
                }}
              >
                {" "}
                futebol{" "}
              </Button>

              <Button
                onClick={() => {
                  filtrarPorCategoria("Guerra");
                }}
              >
                {" "}
                Guerra{" "}
              </Button>
            </Categoria>
            {
              <div>
                <Card>
                  {produtos.map((products) => (
                    <div>
                      <JogosItem
                        product={products}
                        onSelect={handleSelection}
                      />
                    </div>
                  ))}
                </Card>
              </div>
            }
          </div>
        </ListaJogoTitle>
      </ListaJogoHeader>
    </section>
  );
}

export default ListaJogo;

/*<Teste>
<Button
  onClick={() => {
    filtrarPorCategoria("Resultado de Pesquisa");
  }}
>
  {" "}
  Resultado de Pesquisa
  {<div>
    <Card>
      {produtos.map((products) => (
        <div>
          <JogoItem product={products} onSelect={handleSelection} />
        </div>
      ))}
    </Card>
  </div> }
  
</Button>
</Teste>*/
