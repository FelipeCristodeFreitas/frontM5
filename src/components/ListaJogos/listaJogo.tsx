import { JogosItem } from "components/JogoItem/JogoItem";
import { Jogos } from "components/TodosJogos/Interface";
import React, { useEffect, useState } from "react";
import { ProductService } from "Services/JogosServices";
import {
  Button,
  Card,
  Categoria,
  ListaJogoHeader,
  ListaJogoTitle
} from "./style";
import { CategoriasServices } from "../../Services/CategoriasServices";
import { Categorias } from "../Categorias/interface";


interface ListaJogoProps {
  children: React.ReactNode;
}

function ListaJogo({ children }: ListaJogoProps) {
  const [produtosOriginais, definirProdutosOriginais] = React.useState<Jogos[]>([]);
  const [produtos, definirProdutos] = React.useState<Jogos[]>([]);
  const [categorias, setCategorias] = React.useState<Categorias[]>([]);

  const handleSelection = (product: Jogos) => {
  };

  const filtrarPorCategoria = (categoria: any) => {
    const filtro: Jogos[] = [];
    produtosOriginais.forEach(prod =>{
      const cats = prod.categoria.split(", ");
      if (cats.indexOf(categoria) !== -1) filtro.push(prod);
    })

    console.log(filtro)
    definirProdutos(filtro);
  };

  const todosJogos = () => {
    ProductService.getLista().then((listajogos) => {

      for (let i = 0; i < listajogos.length; i++) {
        let categorias = [];
        if (listajogos[i].genres) {
          // @ts-ignore
          for (let j = 0; j < listajogos[i].genres.length; j++) {
            // @ts-ignore
            categorias.push(listajogos[i].genres[j].genre.name);
          }
          listajogos[i].categoria = categorias.join(", ");
        }
      }

      definirProdutos(listajogos);
      definirProdutosOriginais(listajogos);
    });
  };
  const todasAsCategorias = () => {
    CategoriasServices.getLista().then((listajogos) => {
      //console.log(listajogos);
      setCategorias(listajogos);
      //console.log(listajogos);
    });
  };
  useEffect(() => {
    todosJogos();
    todasAsCategorias();
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
              {categorias.map((cat) => (<Button
                key={cat.id}
                onClick={() => {
                  filtrarPorCategoria(cat.name);
                }}
              >
                {cat.name}
              </Button>))}

            </Categoria>
            {
              <div>
                <Card>
                  {produtos.length > 0 && produtos.map((products: Jogos) => (
                    <div key={products.id}>
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
