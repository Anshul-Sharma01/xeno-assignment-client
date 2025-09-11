import { MdKeyboardArrowRight, MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import TenantProfile from "./TenantProfile";


const Navbar : React.FC = () => {

    const { isLoggedIn, tenantData} = useSelector((state : RootState ) => state?.auth);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return(
        <nav className="p-4 border-b-2 border-black/20">
            <div className="flex items-center justify-between md:hidden">
                <span className="text-[#0F62FE] text-3xl font-semibold">xeno</span>
                <button aria-label="Toggle menu" className="p-2" onClick={() => setIsMobileOpen((v) => !v)}>
                    {isMobileOpen ? <MdClose className="text-3xl"/> : <MdMenu className="text-3xl"/>}
                </button>
            </div>

            <div className="hidden md:flex justify-around items-center">
                <ul className="flex justify-center items-center w-fit gap-10">
                    <li className="text-[#0F62FE] text-4xl font-semibold">xeno</li>
                    {
                        isLoggedIn && (
                            <li className="mt-2">Dashboard</li>
                        )
                    }
                </ul>
                <section className="flex justify-center items-center gap-4">
                    {
                        isLoggedIn ? (
                            <>
                                <button className="pt-3 pl-4 pr-4 pb-3 border-gray-200 border-2 rounded-3xl cursor-pointer hover:border-gray-300">
                                    Sign in
                                </button>
                                <button className="pt-3 pl-4 pr-4 pb-3 bg-[#0F62FE] text-white rounded-3xl cursor-pointer flex gap-2 justify-center items-center  hover:translate-y-[-4px] hover:transition-all">
                                    Sign up
                                    <MdKeyboardArrowRight className="text-white text-xl"/>
                                </button>
                            </>
                        ) : (
                            <>
                                <TenantProfile tenantData={tenantData}/>
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
                                <li className="">Dashboard</li>
                            )}
                        </ul>
                        <div className="flex flex-col gap-3">
                            {
                                isLoggedIn ? (
                                    <>
                                        <button className="py-3 px-4 border-gray-200 border-2 rounded-2xl text-left">Sign in</button>
                                        <button className="py-3 px-4 bg-[#0F62FE] text-white rounded-2xl flex items-center justify-center gap-2">
                                            Sign up
                                            <MdKeyboardArrowRight className="text-white text-xl"/>
                                        </button>
                                    </>
                                ) : (
                                    <TenantProfile tenantData={tenantData}/>
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