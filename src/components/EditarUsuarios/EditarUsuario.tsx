import { User, UserResponse, UserUpdate } from "components/Api/Users";
import { useEffect, useState } from "react";
import * as S from "./style";

interface EditUserProps {
  user: UserResponse;
  onCancel: boolean;
  onDelete: (data: UserResponse) => void;
  onEdit: (data: UserUpdate) => void;
}

const EdirtarUsuarios = ({
  user,
  onCancel,
  onDelete,
  onEdit,
}: EditUserProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    cpf: user.cpf,
    isAdmin: user.isAdmin,
    imageUrl: user.imageUrl,
  };

  const [state, setState] = useState(form);

  const userEditFormatter = (toFormat: typeof form): User => ({
    name: toFormat.name,
    username: toFormat.username,
    email: toFormat.email,
    password: toFormat.password,
    cpf: toFormat.cpf,
    isAdmin: toFormat.isAdmin,
    imageUrl: toFormat.imageUrl,
  });

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
    const userFormatted = { user: userEditFormatter(state), id: user.id };
    onEdit(userFormatted);
  };

  const onEditClick = () => {
    setIsEditing(true);
    const userFormatted = { user: userEditFormatter(state), id: user.id };
    onEdit(userFormatted);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [onCancel]);

  return (
    <S.EditUser role="listitem">
      {!isEditing ? (
        <>
          <S.EditUserDetails>
            <S.EditUserDetailsImageWrap>
              <S.EditUserDetailsImage src={user.imageUrl} alt="Foto do usuario" />
            </S.EditUserDetailsImageWrap>
            <S.EditUserDetailsTitle>{user.name}</S.EditUserDetailsTitle>
            <S.EditUserDetailsText>
              <b>usuário: </b> {user.username}
            </S.EditUserDetailsText>
          </S.EditUserDetails>

          <S.EditUserAction onClick={() => onEditClick()}>
            Editar
          </S.EditUserAction>
        </>
      ) : (
        <S.EditFormGroup>
          <S.EditForm
            type="text"
            placeholder="Nome"
            value={state.name}
            onChange={({ target }) => handleChange("name", target.value)}
          />
          <S.EditForm
            type="text"
            placeholder="Sobrenome de usuário"
            value={state.username}
            onChange={({ target }) => handleChange("username", target.value)}
          />
          <S.EditForm
            type="text"
            placeholder="Email"
            value={state.email}
            onChange={({ target }) => handleChange("email", target.value)}
          />
          <S.EditForm
            type="text"
            placeholder="Digite sua Senha"
            value={state.password}
            onChange={({ target }) => handleChange("password", target.value)}
          />
          <S.EditForm
            type="text"
            placeholder="Digite seu Cpf"
            value={state.cpf}
            onChange={({ target }) => handleChange("cpf", target.value)}
          />
          <S.EditForm
            type="text"
            placeholder="IsAdmin"
            value={state.isAdmin}
            onChange={({ target }) => handleChange("isAdmin", target.value)}
          />
          <S.EditForm
            type="Url"
            placeholder="Imagem Url"
            value={state.imageUrl}
            onChange={({ target }) => handleChange("imageUrl", target.value)}
          />
          <S.Delete onClick={() => onDelete(user)} >Deletar</S.Delete>
        </S.EditFormGroup>
      )}
    </S.EditUser>
  );
};

export default EdirtarUsuarios;
