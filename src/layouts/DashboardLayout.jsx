import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const DashboardLayout = () => {
    return (
        <Navbar>
            <main>
                <Outlet /> {/* Conteudo de cad rota / página */}
            </main>
        </Navbar>
    );
};