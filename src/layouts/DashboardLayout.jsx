import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box } from "@chakra-ui/react";
import { AppTour } from "../components/AppTour";

export const DashboardLayout = () => {
    return (
        <AppTour>
            <Navbar />
            <Box as="main" px={6} py={1}>
                <Outlet /> {/* Conteudo de cad rota / página */}
            </Box>
        </AppTour>
    );
};