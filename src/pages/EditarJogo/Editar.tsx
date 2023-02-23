//import { Favorite } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
//import { jogosResponse } from "components/Api/Jogos";
import React, { useEffect, useState } from "react";
//import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import {
  A,
  Button,
  Delete,
  EditForm,
  EditFormGroup,
  EditProduct1,
  EditProductAction,
  JogoItem1,
  JogoItemAno,
  JogoItemCategoria,
  JogoItemDescription,
  JogoItemGamePlay,
  JogoItemImage,
  JogoItemName,
  JogoItemScore,
  JogoItemTreiler
} from "./style";
import { Jogos } from "../../components/TodosJogos/Interface";
import { Categorias } from "../../components/Categorias/interface";
import { CategoriasServices } from "../../Services/CategoriasServices";

//import { ProductService } from "Services/JogosServices";

interface EditJogoProps {
  product: Jogos;
  onEdit: (date: Jogos) => void;
  onDelete: (date: Jogos) => void;
  onCancel: boolean;
}

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
const EditJogo = ({ product, onEdit, onCancel, onDelete }: EditJogoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState<string[]>([]);
  const [categorias, setCategorias] = React.useState<Categorias[]>([]);
  const todasAsCategorias = () => {
    CategoriasServices.getLista().then((listajogos) => {
      setCategorias(listajogos);
    });
  };
  const form = {
    title: product.title,
    categoria: product.categoria,
    description: product.description,
    CoverImageUrl: product.CoverImageUrl,
    year: product.year,
    imdbScore: product.imdbScore,
    trailerYouTubeUrl: product.trailerYouTubeUrl,
    gameplayYouTubeUrl: product.gameplayYouTubeUrl
  };
  const [state, setState] = useState(form);

  const productEditFormatter = (toFormat: typeof form): Jogos => ({
    id: product.id,
    title: product.title,
    categoria: product.categoria,
    description: product.description,
    CoverImageUrl: product.CoverImageUrl,
    year: product.year,
    imdbScore: product.imdbScore,
    trailerYouTubeUrl: product.trailerYouTubeUrl,
    gameplayYouTubeUrl: product.gameplayYouTubeUrl
  });

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };
  const handleChangeCat = (event: SelectChangeEvent<typeof categoriasSelecionadas>) => {
    const {
      target: { value }
    } = event;
    console.log(value)
    setCategoriasSelecionadas(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const onEditClick = () => {
    setIsEditing(true);
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };

  const categoriasDisplay = (cat: any) => {
    let text = [];
    for (let i = 0; i < cat.length; i++) {
      text.push(cat[i].genre.name);
    }
    return <div>{text.join(", ")}</div>;
  };

  const loadCategoriaSelecionada = (product: any) => {
    let text = [];
    for (let i = 0; i < product.genres.length; i++) {
      text.push(product.genres[i].genre.name);
    }
    console.log(text)
    setCategoriasSelecionadas(text);
  };
  useEffect(() => {
    setIsEditing(false);
    todasAsCategorias();
    loadCategoriaSelecionada(product);
  }, [onCancel]);

  return (
    <EditProduct1 role="listitem">
      {!isEditing ? (
        <>
          <JogoItem1>
            <JogoItemImage src={product.CoverImageUrl} />

            <JogoItemName>{product.title}</JogoItemName>
            <JogoItemDescription>
              Descrição: {product.description}
            </JogoItemDescription>
            <JogoItemCategoria>
              Categoria: {categoriasDisplay(product.genres)}
            </JogoItemCategoria>
            <JogoItemAno>Ano do Jogo: {product.year}</JogoItemAno>
            <JogoItemGamePlay>
              Game Play
              <div>
                <A href={product.gameplayYouTubeUrl} target="_blank">
                  {" "}
                  <Button type="button">
                    {" "}
                    <img
                      src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png"
                      height="35"
                      width="60"
                      alt=""
                    />
                  </Button>{" "}
                </A>
              </div>
            </JogoItemGamePlay>
            <JogoItemTreiler>
              Tailer
              <div>
                <A href={product.trailerYouTubeUrl} target="_blank">
                  {" "}
                  <Button type="button">
                    {" "}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlLKEWZjqivasptSTg9q4RwF-TD-pGpSPhqYCT21CA6pVHbQN4ly5C5DPlGY--KkbfNw&usqp=CAU"
                      height="35"
                      width="60"
                      alt=""
                    />
                  </Button>{" "}
                </A>
              </div>
            </JogoItemTreiler>
            <JogoItemScore>Score: {product.imdbScore}</JogoItemScore>
          </JogoItem1>
          <EditProductAction onClick={() => onEditClick()

          }>
            Editar
          </EditProductAction>
        </>
      ) : (
        <EditFormGroup>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="text"
              placeholder="Nome"
              size="small"
              error={Boolean(state.title)}
              value={state.title}
              onChange={({ target }) => handleChange("name", target.value)}
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
              onChange={handleChangeCat}
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
              placeholder="Descrição"
              size="small"
              error={Boolean(state.description)}
              value={state.description}
              onChange={({ target }) => handleChange("description", target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="text"
              placeholder="ImagemUrl"
              size="small"
              error={Boolean(state.CoverImageUrl)}
              value={state.CoverImageUrl}
              onChange={({ target }) => handleChange("imageUrl", target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="number"
              placeholder="Ano"
              size="small"
              error={Boolean(state.year !== null)}
              value={state.year}
              onChange={({ target }) => handleChange("ano", target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="number"
              placeholder="Score"
              size="small"
              error={Boolean(state.imdbScore !== null)}
              value={state.imdbScore}
              onChange={({ target }) => handleChange("score", target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="text"
              placeholder="TreilerUrl"
              size="small"
              error={Boolean(state.trailerYouTubeUrl)}
              value={state.trailerYouTubeUrl}
              onChange={({ target }) => handleChange("treiler", target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <TextField
              type="text"
              placeholder="GamePlayUrl"
              size="small"
              error={Boolean(state.gameplayYouTubeUrl)}
              value={state.gameplayYouTubeUrl}
              onChange={({ target }) => handleChange("gameplay", target.value)}
            />
          </FormControl>
          <Delete onClick={() => onDelete(product)}>Deletar</Delete>
        </EditFormGroup>
      )}
    </EditProduct1>
  );
};

export default EditJogo;
