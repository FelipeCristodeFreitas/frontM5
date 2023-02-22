import { HTMLAttributes, useEffect, useState } from "react";
import {
  AddCard,
  EditForm,
  ManageProducts1,
  ManageProductsActions,
  ManageProductsActionsCancel,
  ManageProductsActionsSave,
  ManageProductsContent,
  ManageProductsContentAdd,
  ManageProductsSub,
  ManageProductsTitle,
  TesteCard,
} from "./style";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Jogos } from "components/TodosJogos/Interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "components/Api/QueryKey";
import { ProductService } from "Services/JogosServices";
import EditJogo from "pages/EditarJogo/Editar";
import { products } from "mock/JogosItens";
import { ErrorResponse } from "components/Api/Error";
import { jogosResponse, Product } from "components/Api/Jogos";
type ManageProductsType = HTMLAttributes<HTMLDivElement>;

type ManageProductsProps = {} & ManageProductsType;

const CadastrarJogos = ({ ...props }: ManageProductsProps) => {
  const [jogos, setJogos] = useState<jogosResponse[]>([]);
  const { data: productsData } = useQuery(
    [QueryKey.JOGOS],
    ProductService.getLista
  );

  // adicionar
  const add = useMutation(ProductService.create, {
    onSuccess: (data: jogosResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const productList = [...products, data as jogosResponse];
      setJogos(productList);
    },
    onError: () => {
      console.error("Erro ao adicionar um jogo");
    },
  });

  // editar
  const update = useMutation(ProductService.updateById, {
    onSuccess: (data: jogosResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedUsers = products.map((i) =>
        data.id === i.id ? (data as jogosResponse) : i
      );
      setJogos(editedUsers);
    },
    onError: () => {
      console.error("Erro ao atualizar o jogo");
    },
  });

  // remover jogo
  const remove = useMutation(ProductService.deleteById,{

    onSuccess: (data: jogosResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const removeProducts = products.filter((i) => data.id !== i.id);
      setJogos(removeProducts);
    },
    onError: () => {
      console.error("Erro ao remover o Jogo");
    },
  });

  let jogosEditados: Jogos[] = [];

  const editados = (toEdite: Jogos) => {
    setCancel(false);
    const existing = jogosEditados.find((user) => user.id === toEdite.id);

    jogosEditados = existing
      ? jogosEditados.map((i) => (i.id === existing.id ? toEdite : i))
      : [...jogosEditados, toEdite];
  };
  const form = {
    name: "",
    categoria: "",
    description: "",
    imageUrl: "",
    ano: "",
    score: "",
    treiler: "",
    gameplay: "",
  };

  const [isAdding, setIsAdding] = useState(false);
  const [jogoToAdd, setJogoToAdd] = useState(form);

  const handleAddChange = (name: string, value: string | number) => {
    setJogoToAdd({ ...jogoToAdd, [name]: value });
  };

  const productIsValid = () =>
    Boolean(
      jogoToAdd.name.length &&
        jogoToAdd.categoria.length &&
        jogoToAdd.description.length &&
        jogoToAdd.imageUrl.length &&
        jogoToAdd.ano.length &&
        jogoToAdd.score.length &&
        jogoToAdd.treiler.length &&
        jogoToAdd.gameplay.length
    );

  const productFormatter = (toFormat: typeof form): Product => ({
    name: toFormat.name,
    categoria: toFormat.categoria,
    description: toFormat.description,
    imageUrl: toFormat.imageUrl,
    ano: toFormat.ano,
    score: toFormat.score,
    treiler: toFormat.treiler,
    gameplay: toFormat.gameplay,
  });

  const [cancel, setCancel] = useState(false);

  const handleCancel = () => {
    setCancel(true);
    setIsAdding(false);
    setTimeout(() => setCancel(false));
    jogosEditados = [];
  };

  const handleSave = () => {
    const canAdd = productIsValid();
    const productFormatted = productFormatter(jogoToAdd);
    jogosEditados.forEach((product) =>
      update.mutate({ product, id: product.id })
    );

    if (canAdd) add.mutate(productFormatted);
    setTimeout(() => handleCancel(), 300);
    setJogoToAdd(form);
    setIsAdding(false);
  };
  const handleDelete = (productToDelete: jogosResponse) => {
    remove.mutate(productToDelete.id);
    handleCancel();
  };

  useEffect(() => {
    setJogos(productsData || []);
  }, [productsData]);

  return (
    <ManageProducts1 {...props}>
      <section>
        <ManageProductsTitle>Cadastrar Jogos</ManageProductsTitle>
        <ManageProductsSub>
          <b>Xbox</b>
        </ManageProductsSub>
        <ManageProductsContent>
          {!isAdding ? (
            <ManageProductsContentAdd onClick={() => setIsAdding(!isAdding)}>
              <ListAltIcon />
              <span>Cadastrar um Jogo</span>
            </ManageProductsContentAdd>
          ) : (
            <AddCard>
              <TesteCard>
                <div>
                  <EditForm
                    type="text"
                    placeholder="Nome"
                    success={Boolean(jogoToAdd.name.length)}
                    value={jogoToAdd.name}
                    onChange={({ target }) =>
                      handleAddChange("name", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="categoria"
                    success={Boolean(jogoToAdd.categoria.length)}
                    value={jogoToAdd.categoria}
                    onChange={({ target }) =>
                      handleAddChange("categoria", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="Descrição"
                    success={Boolean(jogoToAdd.description.length)}
                    value={jogoToAdd.description}
                    onChange={({ target }) =>
                      handleAddChange("description", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="ImagemUrl"
                    success={Boolean(jogoToAdd.imageUrl.length)}
                    value={jogoToAdd.imageUrl}
                    onChange={({ target }) =>
                      handleAddChange("imageUrl", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="Ano"
                    success={Boolean(jogoToAdd.ano)}
                    value={jogoToAdd.ano}
                    onChange={({ target }) =>
                      handleAddChange("ano", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="Score"
                    success={Boolean(jogoToAdd.score)}
                    value={jogoToAdd.score}
                    onChange={({ target }) =>
                      handleAddChange("score", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="TreilerUrl"
                    success={Boolean(jogoToAdd.treiler.length)}
                    value={jogoToAdd.treiler}
                    onChange={({ target }) =>
                      handleAddChange("treiler", target.value)
                    }
                  />
                  <EditForm
                    type="text"
                    placeholder="GamePlayUrl"
                    success={Boolean(jogoToAdd.gameplay.length)}
                    value={jogoToAdd.gameplay}
                    onChange={({ target }) =>
                      handleAddChange("gameplay", target.value)
                    }
                  />
                </div>
              </TesteCard>
            </AddCard>
          )}
          {jogos.map((product, index) => (
            <EditJogo
              product={product}
              key={index}
              onEdit={editados}
              onCancel={cancel}
              onDelete={ () => handleDelete(product)}
            />
          ))}
        </ManageProductsContent>
        <ManageProductsActions>
          <ManageProductsActionsCancel onClick={handleCancel}>
            Cancelar
          </ManageProductsActionsCancel>
          <ManageProductsActionsSave onClick={handleSave}>
            Salvar
          </ManageProductsActionsSave>
        </ManageProductsActions>
      </section>
    </ManageProducts1>
  );
};

export default CadastrarJogos;

/*
import React from 'react'
import { Cadastrar1 } from './style';
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Label,
  LabelSignin,
  Strong,
  Teste,
  Teste1,
} from "./style";
import * as yup from "yup";
import useAuth from "Auth/UseAuth/UseAuth";

const CadastrarJogos = () => {
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ano, setAno] = useState("");
  const [score, setScore] = useState("");
  const [treiler, setTreiler] = useState("");
  const [gameplay, setGameplay] = useState("");


  const [error, setError] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const { cadastrar } = useAuth();
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
  });

  const handleSignup = () => {
    if (!categoria || !description || !name || !imageUrl || !ano || !score || !treiler || !gameplay ) {
      setError("Preencha todos os campos");
      return;
    }
    const res = cadastrar(name, categoria);
    if (res) {
      setError(res);
      return;
    }
    console.log(res, "imagem");

    alert("Jogo cadatrado com sucesso!");
    navigate("/");
  };

  return (
    <Container>
      <Label>Cadastrar Jogos </Label>
      <Content>
        <Input
          type="string"
          placeholder="Nome do Jogo"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Nome da Categoria"
          value={categoria}
          onChange={(e) => [setCategoria(e.target.value), setError("")]}
        />

        <Input
          type="string"
          placeholder="Descrição do jogo"
          value={description}
          onChange={(e) => [setDescription(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Imagem Url"
          value={imageUrl}
          onChange={(e) => [setImageUrl(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Ano do Filme"
          value={ano}
          onChange={(e) => [setAno(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Score"
          value={score}
          onChange={(e) => [setScore(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Treiler Ulr"
          value={treiler}
          onChange={(e) => [setTreiler(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Game play Url"
          value={gameplay}
          onChange={(e) => [setGameplay(e.target.value), setError("")]}
        />
        <Teste> {error}</Teste>
        <Teste1>
          <Button onClick={handleSignup}> Cadastrar</Button>
        </Teste1>
       
      </Content>
    </Container>
  );
};
export default CadastrarJogos;
*/
