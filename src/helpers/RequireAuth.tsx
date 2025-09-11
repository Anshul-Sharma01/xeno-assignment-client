import React from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { Navigate, Outlet } from "react-router-dom"
import XenoLoader from "../components/XenoLoader"

const RequireAuth: React.FC = () => {
    const { isLoggedIn, isHydrating } = useSelector((state: RootState) => state.auth)

    if (isHydrating) {
        return <XenoLoader/>
    }

    if (!isLoggedIn) {
        return <Navigate to="/sign-in"/>
    }

    return <Outlet/>;
}

export default RequireAuth
