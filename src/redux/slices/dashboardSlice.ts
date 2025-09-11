import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { toastHandler } from "../../helpers/toastHandler";
import toast from "react-hot-toast";

export const getDashboardAllThunk = createAsyncThunk(
    "dashboard/getAll",
    async({ tenantId } : { tenantId : string }, { rejectWithValue }) => {
        try{
            const requests = [
                axiosInstance.get(`dashboard/${tenantId}/summary`),
                axiosInstance.get(`dashboard/${tenantId}/orders-by-date`),
                axiosInstance.get(`dashboard/${tenantId}/top-customers`),
                axiosInstance.get(`dashboard/${tenantId}/avg-order-value`)
            ];

            const promise = Promise.allSettled(requests);
            toastHandler(promise as unknown as Promise<any>, "Loading dashboard...", "Dashboard loaded");
            const results = await promise;

            const [summaryRes, ordersRes, topCustomersRes, aovRes] = results as [any, any, any, any];

            [summaryRes, ordersRes, topCustomersRes, aovRes].forEach((r, idx) => {
                if(r.status === "rejected"){
                    const name = ["Summary", "Orders by date", "Top customers", "Average order value"][idx];
                    toast.error(`${name} failed to load`);
                }
            });

            console.log("Summary Parsed:", summaryRes.status === "fulfilled" ? summaryRes.value.data : null);
            console.log("Orders Parsed:", ordersRes.status === "fulfilled" ? ordersRes.value.data : null);
            console.log("Top Customers Parsed:", topCustomersRes.status === "fulfilled" ? topCustomersRes.value.data : null);
            console.log("AOV Parsed:", aovRes.status === "fulfilled" ? aovRes.value.data : null);


            return {
                summary: summaryRes.status === "fulfilled" ? {
                    totalCustomers: summaryRes.value.data?.totalCustomers ?? 0,
                    totalOrders: summaryRes.value.data?.totalOrders ?? 0,
                    totalRevenue: summaryRes.value.data?.totalRevenue ?? 0
                } : { totalCustomers: 0, totalOrders: 0, totalRevenue: 0 },
                ordersByDate: ordersRes.status === "fulfilled" ? (ordersRes.value.data?.orders ?? []) : [],
                topCustomers: topCustomersRes.status === "fulfilled" ? (topCustomersRes.value.data?.topCustomers ?? []) : [],
                averageOrderValue: aovRes.status === "fulfilled" ? (aovRes.value.data?.AOV ?? 0) : 0
            };
        }catch(err: any){
            return rejectWithValue(err.response?.data?.error || "Failed to load dashboard");
        }
    }
);

type DashboardSummary = {
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
};

type DashboardState = {
    summary: DashboardSummary | null;
    ordersByDate: any[];
    topCustomers: any[];
    averageOrderValue: number | null;
};

const initialState: DashboardState = {
    summary: null,
    ordersByDate: [],
    topCustomers: [],
    averageOrderValue: null
};


const dashboardSlice = createSlice({
    name : "dashboard",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getDashboardAllThunk.fulfilled, (state, action: PayloadAction<any>) => {
                const { summary, ordersByDate, topCustomers, averageOrderValue } = action.payload || {};
                state.summary = summary ?? null;
                state.ordersByDate = ordersByDate ?? [];
                state.topCustomers = topCustomers ?? [];
                state.averageOrderValue = typeof averageOrderValue === "number" ? averageOrderValue : null;
            })
            .addCase(getDashboardAllThunk.rejected, (_, action: any) => {
                toast.error(action.payload as string);
            });
    }
})

export default dashboardSlice.reducer;









