import type React from "react";
import { Link, useNavigate } from "react-router-dom";



const SignUp : React.FC = () => {

    const navigate = useNavigate();

    return(
        <section className="min-h-[100vh] w-full flex flex-col justify-center items-center px-4 py-10 bg-[#F2F8FF]">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-center">
                Register as a {" "}
                <span className="text-[#0F62FE] font-extrabold">Tenant</span>
            </h1>

            <form className="mt-8 w-full max-w-xl md:max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="Please enter your email" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" placeholder="Please enter password" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="domain" className="text-sm font-medium text-gray-700">Shopify Domain</label>
                        <input type="text" id="domain" placeholder="your-shop.myshopify.com" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="token" className="text-sm font-medium text-gray-700">Access Token</label>
                        <input type="password" id="token" placeholder="Enter your Shopify access token" className="w-full bg-white rounded-xl px-4 py-3 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F62FE] focus:border-transparent"/>
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


