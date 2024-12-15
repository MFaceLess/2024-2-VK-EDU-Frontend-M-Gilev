import { Endpoints } from './Endpoints';
import { LRUCache } from './lruCache';
import { IApiRequest, IApiResponse } from './types';

//LRU cache - кэширует часто используемые запросы
const lruCache = new LRUCache<string, IApiResponse>(100);


async function fetchApiResponse(request: IApiRequest) : Promise<IApiResponse> {
  const cacheKey = `${request.query}|${request.fromLanguage}|${request.toLanguage}`;
  const cachedResponce = lruCache.get(cacheKey);

  if (cachedResponce !== null) {
    return cachedResponce;
  }

  const params = new URLSearchParams({
    query:    request.query,
    langpair: `${request.fromLanguage}|${request.toLanguage}`,
  });

  try {
    const responce = await fetch(`${Endpoints.translateEndpoint}?${params.toString()}`, {
      method: 'GET',
    })

    if (!responce.ok) {
      const error = await responce.json();
      throw new Error(JSON.stringify(error));
    }

    const data = await responce.json() as IApiResponse;
    lruCache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function translate(query: string, fromLanguage: string, toLanguage: string): Promise<string | null> {
  const request: IApiRequest = {query, fromLanguage, toLanguage};
  try {
    const result = await fetchApiResponse(request);
    return result.responseData.translatedText;
  } catch (error) {
    return null;
  }
}