import { MdKeyboardArrowRight } from "react-icons/md";


const Navbar : React.FC = () => {
    return(
        <nav className="flex justify-around items-center p-4 border-b-2 border-black/20">
            <ul className="flex justify-center items-center w-fit gap-10">
                <li className="text-[#0F62FE] text-4xl font-semibold">xeno</li>
                <li className="mt-2">Dashboard</li>
            </ul>
            <section className="flex justify-center items-center gap-4">
                <button className="pt-3 pl-4 pr-4 pb-3 border-gray-200 border-2 rounded-3xl cursor-pointer hover:border-gray-300">
                    Sign in
                </button>
                <button className="pt-3 pl-4 pr-4 pb-3 bg-[#0F62FE] text-white rounded-3xl cursor-pointer flex gap-2 justify-center items-center  hover:translate-y-[-4px] hover:transition-all">
                    Sign up
                    <MdKeyboardArrowRight className="text-white text-xl"/>
                </button>
            </section>
        </nav>
    )
}

export default Navbar;