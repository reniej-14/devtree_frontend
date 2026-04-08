import { isAxiosError } from "axios";
import { toast} from 'sonner'
import api from "../lib/axios";
import type { LoginForm, ProfileForm, RegisterForm, User } from "../types";

export const createAccount = async (formData: RegisterForm) => {
    try {
        const { data } = await api.post<string>('/auth/register', formData)
        toast.success(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            toast.error(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}

export const login = async (formData: LoginForm) => {
    try {
        const { data } = await api.post<string>('/auth/login', formData)
        localStorage.setItem('AUTH_TOKEN', data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            toast.error(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}

export const getUser = async () => {
    try {
        const { data } = await api<User>('/user')
        return(data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProfile = async (formData: ProfileForm) => {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return(data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
        const { data } = await api.post('/user/image', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}