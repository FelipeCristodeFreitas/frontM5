import styled, { css } from "styled-components";


export const ManageUsers = styled.section`
  padding: 20px;
  background-image: url(https://i.pinimg.com/originals/39/84/39/398439dc7fc7269ef528f0ac5202964c.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const ManageUsersTitle = styled.h1`
 
    font-size: 20px;
    margin: 0;
  
`;

export const ManageUsersSub = styled.h2`

    margin: 25px 0 0 0;
 
    padding-bottom: 10px;
    b {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -13px;
        width: 100%;
        height: 4px;
     
        border-radius: 5rem;
      }
    }
  
`;

export const ManageUsersContent = styled.div`

    margin-top: 15px;
    justify-content: center;
    height: 400px;
    padding-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    overflow: auto;
  
`;
export const ManageUsersContentAdd = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    max-height: 320px;
    box-sizing: border-box;
    padding: 10px 0;

    font-weight: 500;
   
    border-radius: 8px;
    gap: 10px;
    cursor: pointer;
  
`;

export const ManageUsersActions = styled.div`
 
    margin-top: 20px;
    display: flex;
    gap: 10px;
  
`;

export const ManageUsersActionsCancel = styled.button`
 
    width: 172px;
   
`;

export const ManageUsersActionsSave = styled.button`

    width: 172px;
    
  
`;

const EditFormMixins = {
 
};

export const EditForm = styled.input<{ error?: boolean; success?: boolean }>`
 
`;
