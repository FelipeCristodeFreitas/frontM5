import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "Auth/Context/AuthContext";
import React, { useState } from "react";
import { Box1, Box2, Box3, Card1, LabelSignup, Strong } from "./style";
import * as yup from 'yup';
import { RoutePath } from "Router/routes";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
const navigate = useNavigate();
const handleSubmit = () => {
  loginSchema
  .validate({ email, password },{ abortEarly: false} )
  .then((dadosValidados) => {

    login(dadosValidados.email, dadosValidados.password).then(() => {
      window.location.reload();
     
    });
  })
  .catch((errors: yup.ValidationError) => {
      errors.inner.forEach((error) => {
      if (error.path === "email") {
        setEmailError(error.message);
      } else if (error.path === "password") {
        setPasswordError(error.message);
      }
    });
  });

}

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box1>
      <Card1>
        <div>
        <CardContent>
          <Box3>
            <Typography>Faça Login</Typography>

            <TextField
              fullWidth
              label="Email"
              type="Email"
              
              value={email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => setEmailError("")}
              />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => setPasswordError("")}
              />
          </Box3>
        </CardContent>
        <CardActions>
          <Box2>
            <Button variant="contained" onClick={handleSubmit}>
              Entrar
            </Button>
          </Box2>
        </CardActions>
      <LabelSignup>
        Não tem uma conta?
        <Strong>
          <Link to="/Cadastrar">&nbsp;Registre-se</Link>
        </Strong>
      </LabelSignup>
              </div>
      </Card1>
    </Box1>
  );
};
