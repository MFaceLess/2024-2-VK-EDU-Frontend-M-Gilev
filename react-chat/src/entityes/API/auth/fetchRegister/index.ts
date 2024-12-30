import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';

export const fetchRegister = createAsyncThunk(
    'auth-form/fetchRegister',
    async (formData: FormData) => {
        const response = await fetch(`${Enviroment.registerEndpoint}`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        return await response.json();
    }
);