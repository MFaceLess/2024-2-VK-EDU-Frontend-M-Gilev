export class Enviroment {
    public static protocol: string = `https://`;
    public static hub:      string = `vkedu-fullstack-div2.ru`;

    public static registerEndpoint: string = `${this.protocol}${this.hub}/api/register/`;
    public static authEndpoint: string = `${this.protocol}${this.hub}/api/auth/`;
    public static refreshEndpoint: string = `${this.protocol}${this.hub}/api/auth/refresh/`;
}