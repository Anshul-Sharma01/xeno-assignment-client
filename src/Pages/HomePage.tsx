import NavigationLayout from "../layouts/NavigationLayout";

const HomePage = () => {
    return (
        <NavigationLayout>
            <section className="bg-[#F2F8FF] h-screen flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-6xl font-extrabold leading-snug">
                    Your Own <br />
                    <span className="text-[#0F62FE] text-8xl">Multi-Tenant</span> <br />
                    Shopify Environment
                </h1>

                <p className="text-2xl mt-4 bg-[#D0E2FF] p-2 rounded-lg">Want to know more about Xeno ??</p>
                
                <div className="flex justify-center items-center gap-6 mt-8">
                    <a href="https://www.getxeno.com/" target="_blank" className="px-6 py-3 border-2 border-gray-300 rounded-3xl text-gray-600 cursor-pointer hover:border-gray-400 hover:text-gray-800">
                        Learn More
                    </a>

                    <a href="https://www.getxeno.com/culture-code" target="_blank" className="px-8 py-3 bg-[#0F62FE] text-white rounded-3xl font-semibold cursor-pointer shadow-md hover:translate-y-[-4px] hover:shadow-lg transition-all">
                        Xeno Culture Code
                    </a>

                    <a href="https://www.getxeno.com/success-stories" target="_blank" className="px-6 py-3 border-2 border-gray-300 rounded-3xl text-gray-600 cursor-pointer hover:border-gray-400 hover:text-gray-800">
                        Success Stories
                    </a>
                </div>

            </section>

        </NavigationLayout>
    )
}

export default HomePage;