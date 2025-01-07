export interface registerData {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: File | null;
}

export interface authUserData {
    username: string;
    password: string;
}

export interface authUserAns {
    access:     string;
    refresh:    string;
}