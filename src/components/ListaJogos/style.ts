import styled from "styled-components";



export const ListaJogoHeader = styled.div`
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  
`;

export const ListaJogoTitle = styled.div`
 margin-top: 1rem;

`;

export const ListaJogoSelect = styled.select`
  margin-left: 23rem;
  margin: 0rem 29rem 0rem 3rem;
  justify-content: space-between;
`;

export const ListaJogoTodos = styled.div`
  justify-content: center;
  margin-top: 75px;
  display: flex;
  gap: 75px 20px;
  flex-wrap: wrap;
`;
export const Card = styled.div`
margin-left: -2rem;
margin-top: 1rem;
  display: flex;
margin-left: 3rem;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
`;
export const Categoria = styled.div`

  margin-top: 1.5rem;
  align-items: flex-end;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
`;
export const Button = styled.button`
  margin-left: 3rem;
  color: white;
  background-color: blue;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  
`;




export const Teste = styled.div`
margin-top: 2rem;
margin-left: 2rem;
background-color: #90ee90;

`;
export const Modal = styled.div`
  height: 3px;
  overflow: hidden;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(transparent, rgba(red));
    .card.active {
      height: auto;
    }
    .card.active ::before {
      visibility: hidden;
    }
  }
`;
export const Botaomais = styled.button`
  #botao {
    padding: 3px;
    border-radius: 22px;
    margin-top: 5px;
    border: none;
    align-items: center;
    justify-content: center;
    background-color: yellow;
    cursor: pointer;
    :hover {
      background-color: green;
      color: red;
      transition: all 0.2s ease-in-out;
    }
  }
  align-items: center;
  border: none;
  padding: 3px;
  border-radius: 22px;
  margin-top: 5px;

  background-color: yellow;
  font-weight: bolder;
  cursor: pointer;
  font-size: 16px;
  :hover {
    background-color: green;
    color: green;
    transition: all 0.2s ease-in-out;
  }
`;