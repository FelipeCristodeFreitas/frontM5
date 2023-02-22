import styled, { css } from "styled-components";


export const EditUser = styled.div`

    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    max-width: 200px;
    width: 100%;
    min-height: 225px;
    max-height: 320px;
    box-sizing: border-box;
   
  
`;

export const EditUserDetails = styled.div`
 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    gap: 5px;
  
`;

export const EditUserDetailsTitle = styled.h3`

    text-align: center;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-height: 40px;
    font-weight: 700;
    margin: 0;
  
`;

export const EditUserDetailsText = styled.p`

    text-align: center;
    max-width: 90%;
    font-weight: 500;
    margin: 0;
  
`;

export const EditUserDetailsImageWrap = styled.div`

    width: 90%;
    height: 150px;
    border-radius: 50%;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  
`;

export const EditUserDetailsImage = styled.img`
 
    width: 100%;
    /* max-height: 100%; */
    border-radius: 50%;
  
`;

export const EditUserAction = styled.div`
  
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 14px;
    box-sizing: border-box;

    gap: 8px;
    border-radius: 0 0 8px 8px;
    cursor: pointer;
  
`;

export const Delete = styled.button`

    width: 172px;
   
  
`;

const EditFormMixins = {

};

export const EditFormGroup = styled.div`

    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  
`;

export const EditForm = styled.input<{ error?: boolean }>`
 
`;
