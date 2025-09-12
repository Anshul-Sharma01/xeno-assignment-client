import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getDashboardAllThunk } from "../redux/slices/dashboardSlice";
import NavigationLayout from "../layouts/NavigationLayout";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import TenantProfile from "../layouts/TenantProfile";
import socket from "../helpers/socket";
import toast from "react-hot-toast";


interface SocketData{
  tenantId : string;
  timestamp : string;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { summary, ordersByDate, topCustomers, averageOrderValue, abandonedCheckouts } = useSelector(
    (state: RootState) => state.dashboard
  );
  const tenantData = useSelector(
    (state: RootState) => state.auth.tenantData
  );

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const isRangeComplete = !!startDate && !!endDate;
  const isRangeValid = isRangeComplete ? new Date(startDate) <= new Date(endDate) : false;

  

  useEffect(() => {

    socket.on("tenantSyncComplete", (data : SocketData) => {
      if(tenantData?.tenantId == data?.tenantId){
        dispatch(getDashboardAllThunk({ tenantId : tenantData?.tenantId, startDate: startDate || undefined, endDate: endDate || undefined }));
        toast.dismiss();
        toast.success("Data Synced Succesfully");
      }
    })

    return () => {
      socket.off("tenantSyncComplete");
    }
  }, [ tenantData?.tenantId, dispatch, startDate, endDate])

  useEffect(() => {
    socket.on("syncComplete", () => {
      toast.success(`All Tenants Synced !!`);
    })

    return () => {
      socket.off("syncComplete");
    }
  }, [])

  useEffect(() => {
    if (!tenantData?.tenantId) return;
    if (isRangeComplete) {
      if (!isRangeValid) {
        toast.error("Start date must be before or equal to end date");
        return;
      }
      dispatch(getDashboardAllThunk({ tenantId: tenantData.tenantId, startDate, endDate }));
    } else if (!startDate && !endDate) {
      dispatch(getDashboardAllThunk({ tenantId: tenantData.tenantId }));
    }
  }, [tenantData?.tenantId, dispatch, startDate, endDate, isRangeComplete, isRangeValid]);

  return (
    <NavigationLayout>
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-[#0F62FE]">Dashboard</h1>

        {tenantData?.tenantId && tenantData?.tenant_email && tenantData?.tenant_name && tenantData?.tenant_domain && (
          <TenantProfile tenantData={{
            tenant_id: tenantData.tenantId,
            tenant_email: tenantData.tenant_email,
            tenant_name: tenantData.tenant_name,
            tenant_domain: tenantData.tenant_domain
          }} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              {summary?.totalCustomers ?? 0}
            </p>
          </div>
          <div className="p-6 bg-[#D0E2FF] shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              {summary?.totalOrders ?? 0}
            </p>
          </div>
          <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              ₹{summary?.totalRevenue ?? 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FFEDEB] shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Abandoned Checkouts</h2>
            <p className="mt-2 text-3xl font-bold text-[#F60505]">
              {abandonedCheckouts?.count ?? 0}
            </p>
          </div>
        </div>

        <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl">
          <h2 className="text-xl font-semibold">Average Order Value</h2>
          <p className="mt-2 text-2xl font-bold text-[#0F62FE]">
            ₹{averageOrderValue ?? 0}
          </p>
        </div>

        <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Orders & Revenue by Date</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2" max={endDate || undefined} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2" disabled={!startDate} min={startDate || undefined}/>
            <button
              onClick={() => {
                if(!startDate && !endDate){
                  return;
                }
                setStartDate("");
                setEndDate("");
                if (tenantData?.tenantId) {
                  dispatch(getDashboardAllThunk({ tenantId: tenantData.tenantId }));
                }
              }}
              disabled={!startDate && !endDate}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${!startDate && !endDate ? "cursor-not-allowed" : ""}`}
            >
              Clear
            </button>
          </div>
          {ordersByDate.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orderCount" stroke="#0F62FE" strokeWidth={2} name="Orders" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No orders data available.</p>
          )}
        </div>

        <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          {topCustomers.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSpend" fill="#F60505" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No top customers data available.</p>
          )}
        </div>

        <div className="p-6 bg-[#F2F8FF] shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Recent Abandoned Checkouts</h2>
          {abandonedCheckouts?.recent?.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2">Checkout ID</th>
                    <th className="p-2">Customer ID</th>
                    <th className="p-2">Subtotal</th>
                    <th className="p-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {abandonedCheckouts?.recent?.map((c: any) => (
                    <tr key={c.external_id} className="border-t">
                      <td className="p-2">{c.external_id}</td>
                      <td className="p-2">{c.customer_id || "Guest"}</td>
                      <td className="p-2">₹{c.subtotal_price ?? 0}</td>
                      <td className="p-2">{new Date(c.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No abandoned checkouts found.</p>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default Dashboard;
