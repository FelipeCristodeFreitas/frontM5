import { Button, Input, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Content, Label, LabelSignin, Strong, Teste, Teste1 } from "./style";
import useAuth from "Auth/UseAuth/UseAuth";


const Cadastrar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [cpf, setCpf] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { cadastrar } = useAuth();


  const handleSignup = async () => {
    if (!email || !senha || !cpf || !name) {
      setError("Preencha todos os campos");
      return;

    }
    const res = await cadastrar(email, senha, cpf, name, isAdmin);
    if (!res.error) {
      alert("Usuário cadatrado com sucesso!");
      navigate("/")
    }else{
      alert("Erro ao cadastrar usuario" + JSON.stringify(res));
    }

  };

  return (
    <Container>
      <Label>Cadastrar Usuarios </Label>
      <Content>
        <Input
          type="name"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />

        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Input
          type="string"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => [setCpf(e.target.value), setError("")]}
        />
        <FormControlLabel
          label="Administrador?"
          control={<Checkbox
            checked={isAdmin}
            onChange={(e) => [setIsAdmin(e.target.checked), setError("")]} />
          }
        />

        <Teste> {error}</Teste>
        <Teste1>
          <Button onClick={handleSignup}> Inscreva-se </Button>
        </Teste1>
        <LabelSignin>
          Já tem uma conta?
          <Strong>
            <Link to="/">&nbsp;Entre</Link>
          </Strong>
        </LabelSignin>
      </Content>
    </Container>
  );
};

export default Cadastrar;
/*
const handleSignup = () => {
  if (!email | !emailConf | !senha) {
    setError("Preencha todos os campos");
    return;
  } else if (email !== emailConf) {
    setError("Os e-mails não são iguais");
    return;
  }

  const res = signup(email, senha);

  if (res) {
    setError(res);
    return;
  }

  alert("Usuário cadatrado com sucesso!");
  navigate("/");
};
 const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }
*/

