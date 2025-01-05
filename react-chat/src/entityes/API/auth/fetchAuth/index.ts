import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';
import { API } from '../../API';
import { toast } from 'react-toastify';


interface AuthResponse {
    refresh:    string;
    access:     string;
}
const api = new API(Enviroment.baseURL);

export const fetchAuth = createAsyncThunk(
    'auth-form/fetchAuth',
    async (args: {username: string, password: string}) => {
        const { username, password } = args;
        try {
            const response: AuthResponse = await api.post<AuthResponse>(`${Enviroment.authEndpoint}`, {username, password})
            localStorage.setItem('refresh', response.refresh);
            localStorage.setItem('access', response.access);
        } catch (error) {
            const keys = Object.keys(error);
            toast.error(error[keys[0]]);
            throw new Error(JSON.stringify(error));
        }
    }
)