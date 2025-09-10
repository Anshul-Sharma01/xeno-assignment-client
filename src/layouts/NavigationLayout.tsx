import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const NavigationLayout : React.FC<{ children : ReactNode }>  = ({ children }) => {
    return(
        <nav>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </nav>
    )
}

export default NavigationLayout;