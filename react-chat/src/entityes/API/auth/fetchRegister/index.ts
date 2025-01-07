import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';
import { api } from '../../API';
import { toast } from 'react-toastify';


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
        }
    }
);