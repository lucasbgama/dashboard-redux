export interface User {
    id: number;
    name: string;
    username: string;
    address: {
        city: string;
    };
    email: string;
};

export const API_URL =  'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';