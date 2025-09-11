import NavigationLayout from "../layouts/NavigationLayout";

const HomePage = () => {
    return (
        <NavigationLayout>
            <section className="bg-[#F2F8FF] h-screen flex flex-col justify-center items-center text-center px-6 py-8">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-relaxed md:leading-snug">
                    Your Own <br />
                    <span className="text-[#0F62FE] text-5xl sm:text-6xl md:text-8xl">Multi-Tenant</span> <br />
                    Shopify Environment
                </h1>

                <p className="text-base sm:text-lg md:text-2xl mt-4 bg-[#D0E2FF] px-3 py-2 rounded-lg">Want to know more about Xeno ??</p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-8 w-full max-w-3xl">
                    <a href="https://www.getxeno.com/" target="_blank" className="w-full md:w-auto text-center px-6 py-3 border-2 border-gray-300 rounded-3xl text-gray-600 cursor-pointer hover:border-gray-400 hover:text-gray-800">
                        Learn More
                    </a>
                    
                    <a href="https://www.getxeno.com/culture-code" target="_blank" className="w-full md:w-auto text-center px-8 py-3 bg-[#0F62FE] text-white rounded-3xl font-semibold cursor-pointer shadow-md hover:translate-y-[-4px] hover:shadow-lg transition-all">
                        Xeno Culture Code
                    </a>
                    
                    <a href="https://www.getxeno.com/success-stories" target="_blank" className="w-full md:w-auto text-center px-6 py-3 border-2 border-gray-300 rounded-3xl text-gray-600 cursor-pointer hover:border-gray-400 hover:text-gray-800">
                        Success Stories
                    </a>
                </div>

            </section>

        </NavigationLayout>
    )
}

export default HomePage;