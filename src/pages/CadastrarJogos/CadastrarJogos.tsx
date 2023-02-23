import React, { HTMLAttributes, useEffect, useState } from "react";
import {
  AddCard,
  ManageProducts1,
  ManageProductsActions,
  ManageProductsActionsCancel,
  ManageProductsActionsSave,
  ManageProductsContent,
  ManageProductsContentAdd,
  ManageProductsSub,
  ManageProductsTitle,
  TesteCard
} from "./style";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
  OutlinedInput,
  MenuItem,
  TextField
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Jogos } from "components/TodosJogos/Interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "components/Api/QueryKey";
import { ProductService } from "Services/JogosServices";
import EditJogo from "pages/EditarJogo/Editar";
import { products } from "mock/JogosItens";
import { ErrorResponse } from "components/Api/Error";
import { jogosResponse, Product } from "components/Api/Jogos";
import { CategoriasServices } from "../../Services/CategoriasServices";
import { Categorias } from "../../components/Categorias/interface";

type ManageProductsType = HTMLAttributes<HTMLDivElement>;

type ManageProductsProps = {} & ManageProductsType;


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};


const CadastrarJogos = ({ ...props }: ManageProductsProps) => {

  let form = {
    title: "",
    categoria: "",
    description: "",
    CoverImageUrl: "",
    year: 0,
    imdbScore: 0,
    trailerYouTubeUrl: "",
    gameplayYouTubeUrl: ""
  };


  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState<string[]>([]);
  const [categorias, setCategorias] = React.useState<Categorias[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [jogoToAdd, setJogoToAdd] = useState(form);


  const handleAddChange = (name: string, value: string | number) => {
    if(name === 'year') if (typeof value === "string") {
      value = parseInt(value);
    }
    if(name === 'imdbScore') if (typeof value === "string") {
      value = parseInt(value);
    }
    setJogoToAdd({ ...jogoToAdd, [name]: value });
  };

  const handleChange = (event: SelectChangeEvent<typeof categoriasSelecionadas>) => {
    const {
      target: { value }
    } = event;
    setCategoriasSelecionadas(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [jogos, setJogos] = useState<Jogos[]>([]);

  const { data: productsData } = useQuery([QueryKey.JOGOS],ProductService.getLista);

  // adicionar
  const add = useMutation(ProductService.create, {
    onSuccess: (data: Jogos & ErrorResponse) => {
      const productList = [...products, data as Jogos];
      setJogos(productList);
    },
    onError: (e) => {
      console.log(e)
      console.error("Erro ao adicionar um jogo");
    }
  });

  // editar
  const update = useMutation(ProductService.updateById, {
    onSuccess: (data: Jogos & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedUsers = products.map((i) =>
        data.id === i.id ? (data as Jogos) : i
      );
      setJogos(editedUsers);
    },
    onError: () => {
      console.error("Erro ao atualizar o jogo");
    }
  });

  // remover jogo
  const remove = useMutation(ProductService.deleteById, {

    onSuccess: (data: jogosResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const removeProducts = products.filter((i) => data.id !== i.id);
      setJogos(removeProducts);
    },
    onError: () => {
      console.error("Erro ao remover o Jogo");
    }
  });

  let jogosEditados: Jogos[] = [];

  const editados = (toEdite: Jogos) => {
    setCancel(false);
    const existing = jogosEditados.find((user) => user.id === toEdite.id);

    jogosEditados = existing
      ? jogosEditados.map((i) => (i.id === existing.id ? toEdite : i))
      : [...jogosEditados, toEdite];
  };


  const productIsValid = () =>
    Boolean(
      jogoToAdd.title !== `` &&
      jogoToAdd.categoria !== `` &&
      jogoToAdd.description !== `` &&
      jogoToAdd.CoverImageUrl !== `` &&
      jogoToAdd.year &&
      jogoToAdd.imdbScore &&
      jogoToAdd.trailerYouTubeUrl !== `` &&
      jogoToAdd.gameplayYouTubeUrl !== ``
    );

  const productFormatter = (toFormat: typeof form): Product => ({
    title: toFormat.title,
    categoria: toFormat.categoria,
    description: toFormat.description,
    CoverImageUrl: toFormat.CoverImageUrl,
    year: toFormat.year,
    imdbScore: toFormat.imdbScore,
    trailerYouTubeUrl: toFormat.trailerYouTubeUrl,
    gameplayYouTubeUrl: toFormat.gameplayYouTubeUrl
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
    productFormatted.categoria = categoriasSelecionadas.join("|");
    jogosEditados.forEach((product) =>
      update.mutate({ product, id: product.id })
    );

    if (canAdd) add.mutate(productFormatted);
    setJogoToAdd(productFormatted);
    //setIsAdding(false);

  };
  const handleDelete = (productToDelete: Jogos) => {
    remove.mutate(productToDelete.id);
    handleCancel();
  };
  const todasAsCategorias = () => {
    CategoriasServices.getLista().then((listajogos) => {
      setCategorias(listajogos);
      //console.log(listajogos);
    });
  };
  useEffect(() => {
    setJogos(productsData || []);
    todasAsCategorias();
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
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="text"
                      size="small"
                      placeholder="Nome"
                      error={Boolean(jogoToAdd.title.length)}
                      value={jogoToAdd.title}
                      onChange={({ target }) =>
                        handleAddChange("title", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-name-label">Categoria</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      size="small"
                      value={categoriasSelecionadas}
                      onChange={handleChange}
                      input={<OutlinedInput label="Categoria" />}
                      MenuProps={MenuProps}
                    >
                      {categorias.map((categoria) => (
                        <MenuItem
                          key={categoria.id}
                          value={categoria.id}
                          //style={getStyles(categoria.name, personName, theme)}
                        >
                          {categoria.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="text"
                      size="small"

                      placeholder="Descrição"
                      error={Boolean(jogoToAdd.description.length)}
                      value={jogoToAdd.description}
                      onChange={({ target }) =>
                        handleAddChange("description", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="text"
                      size="small"

                      placeholder="ImagemUrl"
                      error={Boolean(jogoToAdd.CoverImageUrl.length)}
                      value={jogoToAdd.CoverImageUrl}
                      onChange={({ target }) =>
                        handleAddChange("CoverImageUrl", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="number"
                      size="small"

                      placeholder="Ano"
                      error={Boolean(jogoToAdd.year)}
                      value={jogoToAdd.year}
                      onChange={({ target }) =>
                        handleAddChange("year", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="number"
                      size="small"

                      placeholder="Score"
                      error={Boolean(jogoToAdd.imdbScore)}
                      value={jogoToAdd.imdbScore}
                      onChange={({ target }) =>
                        handleAddChange("imdbScore", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="text"
                      size="small"

                      placeholder="TreilerUrl"
                      error={Boolean(jogoToAdd.trailerYouTubeUrl.length)}
                      value={jogoToAdd.trailerYouTubeUrl}
                      onChange={({ target }) =>
                        handleAddChange("trailerYouTubeUrl", target.value)
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 200 }}>
                    <TextField
                      type="text"
                      size="small"

                      placeholder="GamePlayUrl"
                      error={Boolean(jogoToAdd.gameplayYouTubeUrl.length)}
                      value={jogoToAdd.gameplayYouTubeUrl}
                      onChange={({ target }) =>
                        handleAddChange("gameplayYouTubeUrl", target.value)
                      }
                    />
                  </FormControl>
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
              onDelete={() => handleDelete(product)}
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
