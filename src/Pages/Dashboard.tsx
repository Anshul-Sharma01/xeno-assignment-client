import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";


const Dashboard = async() => {

    const dispatch = useDispatch < AppDispatch > ();
    const tenantId = useSelector((state : RootState) => state?.auth?.tenantData?.tenantId);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}


export default Dashboard;
