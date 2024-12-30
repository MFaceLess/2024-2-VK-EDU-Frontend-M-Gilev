export interface IApiRequest {
    query: string;
    fromLanguage: string;
    toLanguage: string;
}

export interface IMatch {
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: number;
    reference: string | null;
    "usage-count": number;
    subject: string;
    "created-by": string;
    "last-updated-by": string;
    "create-date": string;
    "last-update-date": string;
    match: number;
}

export interface IApiResponse {
    responseData: {
        translatedText: string;
        match: number;
    };
    quotaFinished: boolean;
    mtLangSupported: boolean | null;
    responseDetails: string;
    responseStatus: number;
    responderId: string | null;
    exception_code: string | null;
    matches: IMatch[];
}