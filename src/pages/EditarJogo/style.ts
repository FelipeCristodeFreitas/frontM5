import styled, { css } from "styled-components";

export const JogoItem1 = styled.div`
  background: blue;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 15px;
  align-items: center;
  width: 180%;
  margin-left: 2rem;
  position: relative;
  z-index: 1;
  transform: translateY(100px);
  cursor: pointer;
  min-height: 225px;
  max-width: 200px;
  margin-top: 1rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const JogoItemImage = styled.img`
  width: 150px;
  margin-top: 1rem;
`;

export const JogoItemName = styled.h3`
  text-align: center;
  max-width: 90%;
  margin: 0;
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
  <JogoItem1>
    <JogoItemImage>imagem</JogoItemImage>
    <JogoItemName> nome do jogo</JogoItemName>
    <JogoItemDescription>descrição</JogoItemDescription>
    <JogoItemCategoria>categoria</JogoItemCategoria>
    <JogoItemAno>ano</JogoItemAno>
    <JogoItemGamePlay>hgjg</JogoItemGamePlay>
    <JogoItemTreiler>treiler</JogoItemTreiler>
    <JogoItemScore>score</JogoItemScore>
  </JogoItem1>;

  */

export const EditProduct1 = styled.div`
 
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    max-width: 200px;
    width: 100%;
    min-height: 25px;
    max-height: 285rem;
    padding-top: 1rem;
   margin-top: -4rem;
    box-sizing: border-box;
  
`;

export const EditProductImage = styled.img`

    width: 130px;
  
`;

export const EditProductDetails = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
  
`;

export const EditProductDetailsName = styled.h3`

    text-align: center;
    max-width: 90%;
    margin: 0;
  
`;



export const EditProductDetailsDescription = styled.small`

    font-size: 12px;
    text-align: center;
    max-width: 90%;
    margin: 0;
  
`;

export const EditProductAction = styled.div`
   color: red;
   background-color: green;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
   margin-top: 5.5rem;
    gap: 8px;
    border-radius: 0 0 8px 8px;
    cursor: pointer;
  
`;

export const Delete = styled.button`
 background-color: red;
    width: 172px;
   
  
`;

export const EditFormGroup = styled.div`
  
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-top: 12rem;
    /* Chrome */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  
`;

const EditFormMixins = {

};

export const EditForm = styled.input<{ error?: boolean; success?: boolean }>`

`;
