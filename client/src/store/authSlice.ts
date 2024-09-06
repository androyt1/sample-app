import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api from "../api/api";

type errorObj = [
    {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
    }
];

interface AuthState {
    token: string | null;
    name: string | null;
    email: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null | errorObj;
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
    status: "idle",
    error: null,
};

interface LoginCredentials {
    email: string;
    password: string;
}

interface ApiResponse {
    token: string;
    message?: string;
}

const handleApiError = (error: unknown) => {
    // if (axios.isAxiosError(error)) {
    //     const axiosError = error as AxiosError<{ message: string } | errorObj>;

    //     return axiosError.response?.data;
    // }
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string } | errorObj>;
        return axiosError.response?.data;
    }
};

export const login = createAsyncThunk<
    string,
    LoginCredentials,
    { rejectValue: { message: string } | errorObj | undefined }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const response = await api.post<ApiResponse>("/auth/login", credentials);
        localStorage.setItem("token", response.data.token);
        return response.data.token;
    } catch (error) {
        localStorage.removeItem("token");
        return rejectWithValue(handleApiError(error));
    }
});

export const googleLogin = createAsyncThunk<
    string,
    string,
    { rejectValue: { message: string } | errorObj | undefined }
>("auth/googleLogin", async (idToken, { rejectWithValue }) => {
    try {
        const response = await api.post<ApiResponse>("/auth/google-login", { idToken });
        localStorage.setItem("token", response.data.token);
        return response.data.token;
    } catch (error) {
        localStorage.removeItem("token");
        return rejectWithValue(handleApiError(error));
    }
});

export const register = createAsyncThunk(
    "auth/register",
    async (credentials: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/register", credentials);
            localStorage.setItem("token", response.data.token);
            return response.data.token;
        } catch (error) {
            localStorage.removeItem("token");
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const getProfile = createAsyncThunk<
    { name: string; email: string }, // Success response type
    void, // No arguments passed to the thunk
    { rejectValue: { message: string } | errorObj | undefined } // Error response type
>("auth/getProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get<{ _id: string; name: string; email: string }>(
            "/auth/profile"
        );
        return { name: response.data.name, email: response.data.email };
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.name = null;
            state.email = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.token = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string | errorObj;
            })
            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.token = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(googleLogin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.token = action.payload;
                state.error = null;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string | errorObj;
            })
            .addCase(getProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                getProfile.fulfilled,
                (state, action: PayloadAction<{ name: string; email: string }>) => {
                    state.status = "succeeded";
                    state.name = action.payload.name;
                    state.email = action.payload.email;
                    state.error = null;
                }
            )
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string | errorObj;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
