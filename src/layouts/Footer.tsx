
const Footer : React.FC = () => {
    return(
        <footer className="flex flex-col justify-center gap-10 mt-10 mb-10 items-center">
            <div className="w-[90vw] h-[1px] bg-gray-300"></div>
            <section className="flex justify-between items-center w-[90vw]">
                <section><span className="text-[#0F62FE] font-bold">Xeno</span> Assignment</section>
                <section>Made by <a href="https://www.linkedin.com/in/anshul-sharma29/" target="_blank" className="text-[#0F62FE] font-bold cursor-pointer transition-colors ease-in-out animate-pulse hover:underline duration-75">Anshul Sharma</a></section>
            </section>
        </footer>
    )
}

export default Footer;