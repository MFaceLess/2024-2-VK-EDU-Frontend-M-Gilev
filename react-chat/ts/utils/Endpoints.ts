export class Endpoints {
    private static protocol:    string = `https://`;
    private static hub:         string = `api.mymemory.translated.net`;

    public static translateEndpoint: string = `${this.protocol}${this.hub}/get`;
}