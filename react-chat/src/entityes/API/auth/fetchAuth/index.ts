import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';

export const fetchAuth = createAsyncThunk(
    'auth-form/fetchAuth',
    async (args: {username: string, password: string}) => {
        const { username, password } = args;
        const response = await fetch(`${Enviroment.authEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        const data = await response.json()
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('access', data.access);
        return data;
    }
)