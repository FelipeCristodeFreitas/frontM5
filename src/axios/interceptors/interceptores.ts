import {AxiosError} from "axios"




export const errointerceptor = (error: AxiosError) => {
    if (error.message === "Network Error") {
        return Promise.reject(new Error('error de conecxão'));
    }
    if(error.response?.status === 401){

    }
    return Promise.reject(error);
} 