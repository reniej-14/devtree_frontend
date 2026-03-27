import { isAxiosError } from "axios";
import { toast} from 'sonner'
import api from "../lib/axios";
import type { RegisterForm } from "../types";

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