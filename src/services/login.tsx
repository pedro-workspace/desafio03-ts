import { api } from "../api"

interface LoginResponse {
    success: boolean;
    user?: {
        name: string;
        email: string;
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const data: any = await api

    if(email !== data.email) {
        return { success: false }
    }

    if(password !== data.password) {
        return { success: false }
    }

    return { 
        success: true,
        user: {
            name: data.name,
            email: data.email
        }
    }
}
