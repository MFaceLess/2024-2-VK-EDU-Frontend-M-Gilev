import { createAsyncThunk } from '@reduxjs/toolkit';
import { Enviroment } from '../../../Enviroment/Enviroment';

export const fetchRefresh = 
    async (refresh: string) => {
        try {
            const response = await fetch(`${Enviroment.refreshEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh})
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Проблемы с refresh токена');
            }
            const data = await response.json();
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            return data;
        } catch (error) {
            return false;
        }
    }
