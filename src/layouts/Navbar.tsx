import { MdKeyboardArrowRight, MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import TenantProfile from "./TenantProfile";
import { Link } from "react-router-dom";
import { logoutTenant } from "../redux/slices/authSlice";

const Navbar : React.FC = () => {

    const { isLoggedIn } = useSelector((state : RootState ) => state?.auth);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    
  const dispatch = useDispatch < AppDispatch >();


    const logoutDispatcher = async (): Promise<void> => {
        await dispatch(logoutTenant());
    };

    return(
        <nav className="p-4 border-b-2 border-black/20">
            <div className="flex items-center justify-between md:hidden">
                <img src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg" alt="xeno-logo"/>
                <button aria-label="Toggle menu" className="p-2" onClick={() => setIsMobileOpen((v) => !v)}>
                    {isMobileOpen ? <MdClose className="text-3xl"/> : <MdMenu className="text-3xl"/>}
                </button>
            </div>

            <div className="hidden md:flex justify-around items-center">
                <ul className="flex justify-center items-center w-fit gap-10">
                    <img src="https://cdn.prod.website-files.com/620353a026ae70e21288308a/6536204e44d00a50cb63e6a4_Vector.svg" alt="xeno-logo"/>
                    {
                        isLoggedIn && (
                            <li className="">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        )
                    }
                </ul>
                <section className="flex justify-center items-center gap-4">
                    {
                        !isLoggedIn ? (
                            <>
                                <Link to="/sign-in" className="pt-3 pl-4 pr-4 pb-3 border-gray-200 border-2 rounded-3xl cursor-pointer hover:border-gray-300">
                                    Sign in
                                </Link>
                                <Link to="/sign-up" className="pt-3 pl-4 pr-4 pb-3 bg-[#0F62FE] text-white rounded-3xl cursor-pointer flex gap-2 justify-center items-center  hover:translate-y-[-4px] hover:transition-all">
                                    Sign up
                                    <MdKeyboardArrowRight className="text-white text-xl"/>
                                </Link>
                            </>
                        ) : (
                            <>
                                <button onClick={logoutDispatcher} className="px-6 py-2 text-md text-white bg-[#0F62FE] rounded-lg hover:bg-red-500 transition-colors duration-200 cursor-pointer">
                                    Logout
                                </button>
                            </>
                        )
                    }
                </section>
            </div>

            {
                isMobileOpen && (
                    <div className="md:hidden mt-3 flex flex-col gap-4">
                        <ul className="flex flex-col gap-2">
                            {isLoggedIn && (
                                <li className="">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                            )}
                        </ul>
                        <div className="flex flex-col gap-3">
                            {
                                !isLoggedIn ? (
                                    <>
                                        <button className="py-3 px-4 border-gray-200 border-2 rounded-2xl text-left">Sign in</button>
                                        <button className="py-3 px-4 bg-[#0F62FE] text-white rounded-2xl flex items-center justify-center gap-2">
                                            Sign up
                                            <MdKeyboardArrowRight className="text-white text-xl"/>
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={logoutDispatcher} className="px-6 py-2 text-md text-white bg-[#0F62FE] rounded-lg hover:bg-red-500 transition-colors duration-200 cursor-pointer">
                                        Logout
                                    </button>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar;