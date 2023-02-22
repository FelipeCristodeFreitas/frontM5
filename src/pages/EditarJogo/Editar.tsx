//import { Favorite } from "@mui/icons-material";
//import { IconButton } from "@mui/material";
//import { jogosResponse } from "components/Api/Jogos";
import { useEffect, useState } from "react";
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
  JogoItemTreiler,
} from "./style";
import { Jogos } from "../../components/TodosJogos/Interface";
//import { ProductService } from "Services/JogosServices";

interface EditJogoProps {
  product: Jogos;
  onEdit: (date: Jogos) => void;
  onDelete: (date: Jogos) => void;
  onCancel: boolean;
}

const EditJogo = ({ product, onEdit, onCancel, onDelete}: EditJogoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = {
    name: product.title,
    categoria: product.categoria,
    description: product.description,
    imageUrl: product.CoverImageUrl,
    ano: product.year,
    score: product.imdbScore,
    treiler: product.trailerYouTubeUrl,
    gameplay: product.gameplayYouTubeUrl,
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
    gameplayYouTubeUrl: product.gameplayYouTubeUrl,
  });

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };
  const onEditClick = () => {
    setIsEditing(true);
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };

  useEffect(() => {
    setIsEditing(false);
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
              Categoria: {product.categoria}
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
          <EditForm
            type="text"
            placeholder="Nome"
            success={Boolean(state.name.length)}
            value={state.name}
            onChange={({ target }) => handleChange("name", target.value)}
          />
          <EditForm
            type="text"
            placeholder="categoria"
            success={Boolean(state.categoria.length)}
            value={state.categoria}
            onChange={({ target }) => handleChange("categoria", target.value)}
          />
          <EditForm
            type="text"
            placeholder="Descrição"
            success={Boolean(state.description.length)}
            value={state.description}
            onChange={({ target }) => handleChange("description", target.value)}
          />
          <EditForm
            type="text"
            placeholder="ImagemUrl"
            success={Boolean(state.imageUrl.length)}
            value={state.imageUrl}
            onChange={({ target }) => handleChange("imageUrl", target.value)}
          />
          <EditForm
            type="number"
            placeholder="Ano"
            success={Boolean(state.ano  !== null)}
            value={state.ano}
            onChange={({ target }) => handleChange("ano", target.value)}
          />
          <EditForm
            type="number"
            placeholder="Score"
            success={Boolean(state.score !== null)}
            value={state.score}
            onChange={({ target }) => handleChange("score", target.value)}
          />
          <EditForm
            type="text"
            placeholder="TreilerUrl"
            success={Boolean(state.treiler.length)}
            value={state.treiler}
            onChange={({ target }) => handleChange("treiler", target.value)}
          />
          <EditForm
            type="text"
            placeholder="GamePlayUrl"
            success={Boolean(state.gameplay.length)}
            value={state.gameplay}
            onChange={({ target }) => handleChange("gameplay", target.value)}
          />
          <Delete onClick={() => onDelete(product)}>Deletar</Delete>
        </EditFormGroup>
      )}
    </EditProduct1>
  );
};

export default EditJogo;
