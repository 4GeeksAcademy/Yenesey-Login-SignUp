import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

// Base layout component
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <Outlet /> {/* Aquí se renderiza la ruta activa */}
        </ScrollToTop>
    );
};
