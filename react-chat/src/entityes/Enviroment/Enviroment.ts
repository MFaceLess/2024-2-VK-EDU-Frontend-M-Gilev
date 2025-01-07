export class Enviroment {
    public static protocol: string = `https`;
    public static hub:      string = `vkedu-fullstack-div2.ru`;
    public static baseURL:  string = `${this.protocol}://${this.hub}`;

    public static registerEndpoint: string = `/api/register/`;
    public static authEndpoint:     string = `/api/auth/`;
    public static refreshEndpoint:  string = `${this.protocol}://${this.hub}/api/auth/refresh/`;
}