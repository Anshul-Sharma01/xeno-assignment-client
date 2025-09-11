import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { isTokenValid } from "../../helpers/istokenValid";
import Cookies from "js-cookie";
import { getTenantData, type TenantPayload } from "../../helpers/getTenantData";
import { toastHandler } from "../../helpers/toastHandler";

const token = Cookies.get("accessToken");

interface TenantState{
    isLoggedIn : boolean;
    tenantData : TenantPayload | null;
}

const initialState : TenantState = {
    isLoggedIn : token ? isTokenValid(token) : false,
    tenantData : token && isTokenValid(token) ? getTenantData(token) : null
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

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(registerTenant.fulfilled, (state, action : PayloadAction < any > ) => {
                if(action?.payload?.success){
                    state.isLoggedIn = true;
                    state.tenantData = getTenantData(action?.payload?.data?.tokens?.accessToken);
                }
            })
            .addCase(registerTenant.rejected, (_, action : PayloadAction < any >) => {
                toast.error(action.payload as string);
            })

            .addCase(loginTenant.fulfilled, (state, action : PayloadAction < any >) => {
                if(action?.payload?.success){
                    state.isLoggedIn = true;
                    state.tenantData = getTenantData(action?.payload?.data?.tokens?.accessToken);
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

    } 
})

export default authSlice.reducer;