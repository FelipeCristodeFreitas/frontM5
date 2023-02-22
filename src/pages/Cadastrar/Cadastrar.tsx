import { Button, Input } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Content, Label, LabelSignin, Strong, Teste, Teste1 } from "./style";
import * as yup from "yup";
import useAuth from "Auth/UseAuth/UseAuth";


const Cadastrar = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
 const  {cadastrar}  = useAuth();
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

  const handleSignup = () => {
    if (!email || !senha || !cpf || !name) {
      setError("Preencha todos os campos");
      return;
   
    }
     const res = cadastrar(email, senha);
     if (res) {
       setError(res);
       return;
     }
     console.log(res, "dtdtdt")


    alert("Usuário cadatrado com sucesso!");
    navigate("/");

    
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
          type="username"
          placeholder="Digite seu sobrenome"
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
        <Input
        
          type="string"
          placeholder="Digite seu se e admin"
          value={cpf}
          onChange={(e) => [setCpf(e.target.value), setError("")]}
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

