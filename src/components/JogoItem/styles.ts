import styled from "styled-components";
export const JogoItem1 = styled.div`
  background: green;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 15px;
  align-items: center;
  width: 300px;
  padding: 25px;
 margin-left: 3rem;
  position: relative;
  z-index: 1;
  transform: translateY(100px);
 
  min-height: 225px;
  max-width: 200px;
  margin-top: -5rem;
  margin-bottom: 8rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const JogoItemImage = styled.img`
  width: 150px;
  margin-top: 10px;
`;

export const JogoItemName = styled.h3`
  text-align: center;
  max-width: 100%;
  overflow-wrap: break-word;
 
  color: white;
`;

export const JogoItemAno = styled.strong`
  text-align: center;
  max-width: 90%;
  margin: 0;
`;

export const JogoItemDescription = styled.small`
  text-align: center;
  max-width: 90%;
  margin: 0;
  font-size: 12px;
`;
export const JogoItemCategoria = styled.small`
  text-align: center;
  max-width: 90%;
  margin: 0;
  font-size: 12px;
`;
export const JogoItemScore = styled.small`
  text-align: center;
  max-width: 90%;
  margin: 0;
  font-size: 12px;
`;
export const JogoItemTreiler = styled.small`
  text-align: center;
  max-width: 90%;
  margin: 0;
  font-size: 12px;
`;
export const JogoItemGamePlay = styled.small`
  text-align: center;
  max-width: 90%;
  margin: 0;
  font-size: 12px;
`;

export const A = styled.a`
  width: 150px;
  margin-top: 1px;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 40px;
  color: white;

  align-items: center;
  font-size: 0.9rem;
  border-radius: .4rem;
`;

export const Imagem = styled.div`
width: 20%;
  
`;
/*
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
*/