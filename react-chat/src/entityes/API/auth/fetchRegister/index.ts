import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';
import { API } from '../../API';
import { toast } from 'react-toastify';

const api = new API(Enviroment.baseURL);

export const fetchRegister = createAsyncThunk(
    'auth-form/fetchRegister',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post(Enviroment.registerEndpoint, formData, true);
            return response;
        } catch (error) {
            const keys = Object.keys(error);
            toast.error(error[keys[0]][0]);
            throw new Error(JSON.stringify(error));
            // return rejectWithValue(error);
        }

        // const response = await fetch(`${Enviroment.registerEndpoint}`, {
        //     method: 'POST',
        //     body: formData,
        // });
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(JSON.stringify(errorData));
        // }
        // return await response.json();
    }
);