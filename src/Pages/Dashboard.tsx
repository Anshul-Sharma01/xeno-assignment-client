import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getDashboardAllThunk } from "../redux/slices/dashboardSlice";
import NavigationLayout from "../layouts/NavigationLayout";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { summary, ordersByDate, topCustomers, averageOrderValue } = useSelector(
    (state: RootState) => state.dashboard
  );
  const tenantId = useSelector(
    (state: RootState) => state.auth.tenantData?.tenantId
  );

  useEffect(() => {
    if (tenantId) {
      dispatch(getDashboardAllThunk({ tenantId }));
    }
  }, [tenantId, dispatch]);

  return (
    <NavigationLayout>
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-[#0F62FE]">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              {summary?.totalCustomers ?? 0}
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              {summary?.totalOrders ?? 0}
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl text-center">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="mt-2 text-3xl font-bold text-[#0F62FE]">
              ₹{summary?.totalRevenue ?? 0}
            </p>
          </div>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold">Average Order Value</h2>
          <p className="mt-2 text-2xl font-bold text-[#0F62FE]">
            ₹{averageOrderValue ?? 0}
          </p>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Orders & Revenue by Date</h2>
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

        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          {topCustomers.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSpend" fill="#0F62FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No top customers data available.</p>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default Dashboard;
