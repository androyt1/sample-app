import api from "./api";
import store from "../store/store";

export const setupAxiosInterceptor = () => {
    api.interceptors.request.use((config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers["x-auth-token"] = token;
        }
        return config;
    });
};
