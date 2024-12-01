import { useDispatch } from "react-redux";
import { fetchRefresh } from "../fetchRefreshToken";
import { NavigateFunction } from "react-router-dom"

//Навешиваем на все запросы декоратор, во избежание unauth, либо делаем редирект
export const fetchWithAuth = (fetchFn: typeof fetch, navigate: NavigateFunction) => {
    return async (...args: Parameters<typeof fetch>) => {
        const executeFetch = async () => {            
            const response = await fetchFn(...args);
            if (!response.ok) {
                if (response.status === 401) {
                    const refreshToken = localStorage.getItem('refresh');
                    if (refreshToken !== null) {
                        const refreshed = await fetchRefresh(refreshToken);
                        if (refreshed) {
                            args[1] = {
                                ...args[1],
                                headers: {
                                    ...args[1]?.headers,
                                    'Authorization': `Bearer ${refreshed.access}`,
                                    'Content-Type': 'application/json',
                                }
                            };
                            await fetchFn(...args);
                        }
                    }
                    // return null;
                }
            }
            return response;
        };

        try {
            const response = await executeFetch();
            if (response === null) return;
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }
            return response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            navigate('/auth');
        }
    };
};