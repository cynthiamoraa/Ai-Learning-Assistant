import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "contente-Type": "application/json",
        Accept: "application/json",
    },
})

//Request Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 500) {
                console.error("Server error. Please try again later")
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeour. Please try again.")
        }
    }
)

export default axiosInstance