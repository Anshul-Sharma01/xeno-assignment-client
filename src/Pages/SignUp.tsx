import type React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../redux/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerTenant } from "../redux/slices/authSlice";


interface RegisterData{
    name : string,
    email : string,
    password : string,
    shopifyDomain : string,
    accessToken : string,
}


const SignUp : React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch < AppDispatch >();

    const [registerData, setRegisterData] = useState < RegisterData > ({
        name : "",
        email : "",
        password : "",
        shopifyDomain : "",
        accessToken : ""
    })

    const registerDispatcher = async(e : React.FormEvent < HTMLFormElement >) => {
        e.preventDefault();
        if(!registerData?.email || !registerData?.name || !registerData?.password || !registerData?.shopifyDomain || !registerData?.accessToken){
            toast.error("All fields are mandatory !!");
            return;
        }
        const res = await dispatch(registerTenant(registerData));
        if(res?.payload?.success){
            navigate("/");
            setRegisterData({
                name : "",
                email : "",
                password : "",
                shopifyDomain : "",
                accessToken : ""
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    return(
        <section className="min-h-[100vh] w-full flex flex-col justify-center items-center px-4 py-10 bg-[#F2F8FF]">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center">
                Register as a {" "}
                <span className="text-[#0F62FE] font-extrabold">Tenant</span>
            </h1>

            <form onSubmit={registerDispatcher} className="mt-8 w-full max-w-xl md:max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="Name" className="text-sm font-medium text-gray-700">Name</label>
                        <input value={registerData?.name} onChange={handleChange} type="text" id="Name" name="name" placeholder="Please enter your Name" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input value={registerData?.email} onChange={handleChange} type="email" id="email" name="email" placeholder="Please enter your email" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input value={registerData?.password} onChange={handleChange} type="password" id="password" name="password" placeholder="Please enter password" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="domain" className="text-sm font-medium text-gray-700">Shopify Domain</label>
                        <input value={registerData?.shopifyDomain} onChange={handleChange} type="text" id="domain" name="shopifyDomain" placeholder="your-shop.myshopify.com" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="token" className="text-sm font-medium text-gray-700">Access Token</label>
                        <input value={registerData?.accessToken} onChange={handleChange} type="password" id="token" name="accessToken" placeholder="Enter your Shopify access token" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row items-center gap-3">
                    
                    <button type="button" onClick={() => navigate(-1)}  className="w-full md:w-auto px-8 py-3  text-[#0F62FE] border-2 border-gray-200 rounded-3xl font-semibold cursor-pointer  hover:translate-y-[-2px]  transition-all">
                        Back
                    </button>
                    <button type="submit" className="w-full md:w-auto px-8 py-3 bg-[#0F62FE] text-white rounded-3xl font-semibold cursor-pointer shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all">
                        Submit
                    </button>
                </div>
                    <p className="text-sm text-gray-500 text-center md:text-left mt-2">
                        Already registered ? {" "}
                        <Link to="/sign-in" className="text-[#0F62FE]">Sign In</Link> 
                    </p> 
            </form>
        </section>
    )
}

export default SignUp;


