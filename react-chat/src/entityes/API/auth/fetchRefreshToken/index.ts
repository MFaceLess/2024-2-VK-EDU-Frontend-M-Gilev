import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';

export const fetchRefresh = 
    async (refresh: string) => {
        const response = await fetch(`${Enviroment.refreshEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh})
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access', data.access);
            return true;
        }
        return false;
    }
