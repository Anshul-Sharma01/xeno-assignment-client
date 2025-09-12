import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { toastHandler } from "../../helpers/toastHandler";


interface TenantData{
    accessToken : string,
    refreshToken : string,
    tenantId : string,
    tenant_name : string,
    tenant_email : string,
    tenant_domain : string
}

interface TenantState{
    isLoggedIn : boolean;
    tenantData : TenantData | null;
    isHydrating : boolean;
}

const initialState : TenantState = {
    isLoggedIn : false,
    tenantData : null,
    isHydrating : true
}

export const registerTenant = createAsyncThunk("auth/register", async(data : any, { rejectWithValue }) => {
    try{
        const promise = axiosInstance.post("tenant/register", data);
        toastHandler(promise, "Registering new Tenant...", "Registered Successfully !!");
        const res = await promise;
        return res.data;
    }catch(err : any){
        return rejectWithValue(err.response?.data?.error || "error occurred while registeration process...");
    }
})

export const loginTenant = createAsyncThunk("auth/login", async(data : any, { rejectWithValue }) => {
    try{    
        const promise = axiosInstance.post("tenant/login", data);
        toastHandler(promise, "Logging In...", "Successfully Logged In !!");
        const res = await promise;
        return res.data;
    }catch(err : any){
        return rejectWithValue(err.response?.data?.error || "Error occurred while logging...");
    }
})

export const logoutTenant = createAsyncThunk("auth/logout", async(_, { rejectWithValue }) => {
    try{
        const promise = axiosInstance.post("tenant/logout");
        toastHandler(promise, "Logging out...", "Successfully logged out !!");
        const res = await promise;
        return res.data;
    }catch(err : any){
        return rejectWithValue(err.response?.data?.error || "Logout Failed !!");
    }
})

export const hydrateAuth = createAsyncThunk("auth/hydrate", async(_, { rejectWithValue }) => {
    try{
        const res = await axiosInstance.post("tenant/refresh-token");
        return res.data;
    }catch(err : any){
        return rejectWithValue(err.response?.data?.error || "Not authenticated");
    }
})

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(registerTenant.fulfilled, (state, action : PayloadAction < any > ) => {
                if(action?.payload?.success){
                    state.isLoggedIn = true;
                    state.tenantData = action?.payload?.tenantData;
                }
            })
            .addCase(registerTenant.rejected, (_, action : PayloadAction < any >) => {
                toast.error(action.payload as string);
            })

            .addCase(loginTenant.fulfilled, (state, action : PayloadAction < any >) => {
                if(action?.payload?.success){
                    state.isLoggedIn = true;
                    state.tenantData = action?.payload?.tenantData;
                }
            })
            .addCase(loginTenant.rejected, (_, action : PayloadAction < any >) => {
                console.log("Error on login : ", action);
                toast.error(action.payload as string);
            })

            .addCase(logoutTenant.fulfilled, (state, _) => {
                state.isLoggedIn = false;
                state.tenantData = null;
            })
            .addCase(logoutTenant.rejected, (state, _) => {
                state.isLoggedIn = false;
                state.tenantData = null;
            })

            .addCase(hydrateAuth.pending, (state) => {
                state.isHydrating = true;
            })

            .addCase(hydrateAuth.fulfilled, (state, action: PayloadAction<any>) => {
                state.isHydrating = false;
                console.log("Hydrate fulfilled payload:", action.payload); // 👀 log backend data

                if (action?.payload?.success) {
                  state.isLoggedIn = true;
                  state.tenantData = action?.payload?.tenantData ?? null;
                }
            })

            .addCase(hydrateAuth.rejected, (state) => {
                state.isHydrating = false;
                state.isLoggedIn = false;
                state.tenantData = null;
            });
              
    } 
})

export default authSlice.reducer;