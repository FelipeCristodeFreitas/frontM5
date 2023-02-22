import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "components/Api/Error";
import { jogosResponse } from "components/Api/Jogos";
import { QueryKey } from "components/Api/QueryKey";
import { User, UserResponse, UserUpdate } from "components/Api/Users";
import EdirtarUsuarios from "components/EditarUsuarios/EditarUsuario";
import { HTMLAttributes, useEffect, useState } from "react";
import { UserService } from "Services/UsersServices";
import * as S from "./style";

type ManageUsersType = HTMLAttributes<HTMLDivElement>;

type ManageUsersProps = {} & ManageUsersType;

const Usuarios = ({ ...props }: ManageUsersProps) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const { data: usersData } = useQuery([QueryKey.USERS], UserService.getLista);

  const add = useMutation(UserService.create, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const userList = [...users, data as UserResponse];
      setUsers(userList);
    },
    onError: () => {
      console.error("Erro ao criar um usuário");
    },
  });

  const remove = useMutation(UserService.deleteById, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedUsers = users.filter((i) => data.id !== i.id);
      setUsers(editedUsers);
    },
    onError: () => {
      console.error("Erro ao remover o usuário");
    },
  });

  const update = useMutation(UserService.updateById, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedUsers = users.map((i) =>
        data.id === i.id ? (data as UserResponse) : i
      );
      setUsers(editedUsers);
    },
    onError: () => {
      console.error("Erro ao atualizar o usuário");
    },
  });

  const [isAdding, setIsAdding] = useState(false);
  const [cancel, setCancel] = useState(false);

  type usersToEditType = { id: string } & User;

  let usersToEdit: usersToEditType[] = [];

  const form = {
    name: "",
    username: "",
    email: "",
    password: "",
    cpf: "",
    isAdmin: "",
    imageUrl: "",
  };

  const [userToAdd, setUserToAdd] = useState(form);

  const handleAddChange = (name: string, value: string) => {
    setUserToAdd({ ...userToAdd, [name]: value });
  };

  const onEditUser = (toEdit: UserUpdate) => {
    setCancel(false);
    const existing = usersToEdit.find((user) => user.id === toEdit.id);

    const userFormatted = { ...toEdit.user, id: toEdit.id };

    usersToEdit = existing
      ? usersToEdit.map((i) => (i.id === existing.id ? userFormatted : i))
      : [...usersToEdit, userFormatted];
  };

  const handleCancel = () => {
    setCancel(true);
    setIsAdding(false);
    setTimeout(() => setCancel(false));
    usersToEdit = [];
  };

  const handleDelete = (user: UserResponse) => {
    remove.mutate(user.id);
    handleCancel();
  };

  const userIsValid = () =>
    Boolean(
      userToAdd.name.length &&
        userToAdd.username.length &&
        userToAdd.email.length &&
        userToAdd.password.length &&
        userToAdd.cpf.length &&
        userToAdd.isAdmin &&
        userToAdd.imageUrl
    );

  const userFormatter = (toFormat: typeof form): User => ({
    name: toFormat.name,
    username: toFormat.username,
    email: toFormat.email,
    password: toFormat.password,
    cpf: toFormat.cpf,
    isAdmin: toFormat.isAdmin,
    imageUrl: toFormat.imageUrl,
  });

  const handleSave = () => {
    const canAdd = userIsValid();
    const user = userFormatter(userToAdd);

    usersToEdit.forEach((user) => update.mutate({ user, id: user.id }));

    if (canAdd) add.mutate(user);
    setTimeout(() => handleCancel(), 300);
    setUserToAdd(form);
    setIsAdding(false);
  };

  useEffect(() => {
    setUsers(usersData || []);
  }, [usersData]);
  return (
    <S.ManageUsers {...props}>
      <S.ManageUsersTitle>Cadastrar Usuários </S.ManageUsersTitle>
      <S.ManageUsersSub>
        <b>Usuários</b>
      </S.ManageUsersSub>
      <S.ManageUsersContent>
        {!isAdding ? (
          <S.ManageUsersContentAdd onClick={() => setIsAdding(true)}>
            <span>Adicionar Usuário</span>
          </S.ManageUsersContentAdd>
        ) : (
          <S.ManageUsersContentAdd>
            <S.EditForm
              type="text"
              placeholder="Nome"
              success={Boolean(userToAdd.name.length)}
              value={userToAdd.name}
              onChange={({ target }) => handleAddChange("name", target.value)}
            />
            <S.EditForm
              type="text"
              placeholder="Sobrenome de usuário"
              success={Boolean(userToAdd.username.length)}
              value={userToAdd.username}
              onChange={({ target }) => handleAddChange("username", target.value)}
            />
            <S.EditForm
              type="text"
              placeholder="Email"
              success={Boolean(userToAdd.email.length)}
              value={userToAdd.email}
              onChange={({ target }) => handleAddChange("email", target.value)}
            />
            <S.EditForm
              type="text"
              placeholder="Digite sua Senha"
              minLength={6}
              success={Boolean(userToAdd.password.length)}
              value={userToAdd.password}
              onChange={({ target }) => handleAddChange("password", target.value)}
            />
            <S.EditForm
              type="text"
              placeholder="Digite seu Cpf"
              success={Boolean(userToAdd.cpf.length)}
              value={userToAdd.cpf}
              onChange={({ target }) => handleAddChange("cpf", target.value)}
            />
            <S.EditForm
              type="text"
              placeholder="IsAdmin"
              success={Boolean(userToAdd.isAdmin.length)}
              value={userToAdd.isAdmin}
              onChange={({ target }) =>
                handleAddChange("isAdmin", target.value)
              }
            />
            <S.EditForm
              type="Url"
              placeholder="Imagem Url"
              success={Boolean(userToAdd.imageUrl.length)}
              value={userToAdd.imageUrl}
              onChange={({ target }) =>
                handleAddChange("imageUrl", target.value)
              }
            />
          </S.ManageUsersContentAdd>
        )}
        {users.map((user, index) => (
          <EdirtarUsuarios
            user={user}
            key={index}
            onEdit={onEditUser}
            onCancel={cancel}
            onDelete={handleDelete}
          />
        ))}
   
      </S.ManageUsersContent>
      <S.ManageUsersActions>
        <S.ManageUsersActionsCancel onClick={handleCancel}>
          Cancelar
        </S.ManageUsersActionsCancel>
        <S.ManageUsersActionsSave onClick={handleSave}>
          Salvar Mudanças
        </S.ManageUsersActionsSave>
      </S.ManageUsersActions>
    </S.ManageUsers>
  );
};

export default Usuarios;
