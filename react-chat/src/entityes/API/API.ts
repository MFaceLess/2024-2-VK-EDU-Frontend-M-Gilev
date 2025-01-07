import { ErrorResponse } from "react-router-dom";
import { toast } from "react-toastify";
import { Enviroment } from "../Enviroment/Enviroment";


export class API {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async call<T>(  endpoint: string, 
                            method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
                            body?: unknown, 
                            headers?: HeadersInit) : Promise<T> {
        try {
            const options: RequestInit = {
                method,
                body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
            };

            if (headers) {
                options.headers = headers;
            }
            const response = await fetch(`${this.baseURL}${endpoint}`, options);

            if (!response.ok) {
                const error: ErrorResponse = await response.json();
                throw error;
            }

            return await response.json();
        } catch(error) {
            // toast.error(error.toString());
            throw error;
        }
    }

    public get<T>(endpoint: string): Promise<T> {
        return this.call<T>(endpoint, 'GET');
    }

    public post<T>(endpoint: string, body: unknown, isFormData = false): Promise<T> {
        const headers = isFormData ? undefined : { 'Content-Type' : 'application/json' };
        return this.call<T>(endpoint, 'POST', body, headers);
    }

    public put<T>(endpoint: string, body: unknown): Promise<T> {
        return this.call<T>(endpoint, 'PUT', body);
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.call<T>(endpoint, 'DELETE');
    }
}


export const api = new API(Enviroment.baseURL);