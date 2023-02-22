import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { jogosResponse } from "components/Api/Jogos";
import { useEffect, useState } from "react";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import {
  A,
  Button,
  Delete,
  EditForm,
  EditFormGroup,
  EditProduct1,
  EditProductAction,
  EditProductDetails,
  EditProductDetailsDescription,


  EditProductImage,
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
import { ProductService } from "Services/JogosServices";

interface EditJogoProps {
  product: jogosResponse;
  onEdit: (date: jogosResponse) => void;
  onDelete: (date: jogosResponse) => void;
  onCancel: boolean;
}

const EditJogo = ({ product, onEdit, onCancel, onDelete}: EditJogoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = {
    name: product.name,
    categoria: product.categoria,
    description: product.description,
    imageUrl: product.imageUrl,
    ano: product.ano,
    score: product.score,
    treiler: product.treiler,
    gameplay: product.gameplay,
  };
  const [state, setState] = useState(form);

  const productEditFormatter = (toFormat: typeof form): jogosResponse => ({
    id: product.id,
    name: toFormat.name,
    categoria: toFormat.categoria,
    description: toFormat.description,
    imageUrl: toFormat.imageUrl,
    ano: toFormat.ano,
    score: toFormat.score,
    treiler: toFormat.treiler,
    gameplay: toFormat.gameplay,
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
            <JogoItemImage src={product.imageUrl} />

            <JogoItemName>{product.name}</JogoItemName>
            <JogoItemDescription>
              Descrição: {product.description}
            </JogoItemDescription>
            <JogoItemCategoria>
              Categoria: {product.categoria}
            </JogoItemCategoria>
            <JogoItemAno>Ano do Jogo: {product.ano}</JogoItemAno>
            <JogoItemGamePlay>
              Game Play
              <div>
                <A href={product.gameplay} target="_blank">
                  {" "}
                  <Button type="button">
                    {" "}
                    <img
                      src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png"
                      height="35"
                      width="60"
                    />
                  </Button>{" "}
                </A>
              </div>
            </JogoItemGamePlay>
            <JogoItemTreiler>
              Tailer
              <div>
                <A href={product.treiler} target="_blank">
                  {" "}
                  <Button type="button">
                    {" "}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNlLKEWZjqivasptSTg9q4RwF-TD-pGpSPhqYCT21CA6pVHbQN4ly5C5DPlGY--KkbfNw&usqp=CAU"
                      height="35"
                      width="60"
                    />
                  </Button>{" "}
                </A>
              </div>
            </JogoItemTreiler>
            <JogoItemScore>Score: {product.score}</JogoItemScore>
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
            type="text"
            placeholder="Ano"
            success={Boolean(state.ano.length)}
            value={state.ano}
            onChange={({ target }) => handleChange("ano", target.value)}
          />
          <EditForm
            type="text"
            placeholder="Score"
            success={Boolean(state.score.length)}
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
