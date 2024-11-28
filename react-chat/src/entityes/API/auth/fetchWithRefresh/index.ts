import { fetchRefresh } from "../fetchRefreshToken";

export const fetchWithAuth = async (input: RequestInfo, init?: RequestInit) => {
    const executeFetch = async () => {
        const response = await fetch(input, init);
        if (!response.ok) {
            if (response.status === 401) {
                const refreshToken = localStorage.getItem('refresh');
                if (refreshToken) {
                    const refreshed = await fetchRefresh(refreshToken);
                    if (refreshed) {
                        if (init?.headers) {
                            (init.headers as Record<string, string>)['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
                        }
                        return await fetch(input, init);
                    }
                }
                throw new Error('Unauthorized');
            }
        }
        return response;
    };

    try {
        const response = await executeFetch();
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};