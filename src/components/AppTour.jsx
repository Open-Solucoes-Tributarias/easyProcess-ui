import React, { createContext, useContext, useState, useEffect } from "react";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { useLocation } from "react-router-dom";
import { tourSteps } from "../utils/tourSteps";

const TourContext = createContext();

export const useTour = () => useContext(TourContext);

export const AppTour = ({ children }) => {
    const location = useLocation();
    const [run, setRun] = useState(false);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        // Carrega os passos baseados na rota atual
        const currentSteps = tourSteps[location.pathname] || [];
        setSteps(currentSteps);
        // Opcional: Se quiser resetar o tour ao mudar de rota, descomente a linha abaixo
        // setRun(false); 
    }, [location.pathname]);

    const startTour = () => {
        if (steps.length > 0) {
            setRun(true);
        } else {
            console.log("Nenhum tour configurado para esta página.");
        }
    };

    const handleJoyrideCallback = (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
        }
    };

    return (
        <TourContext.Provider value={{ startTour }}>
            <Joyride
                callback={handleJoyrideCallback}
                continuous
                run={run}
                scrollToFirstStep
                showProgress
                showSkipButton
                steps={steps}
                styles={{
                    options: {
                        zIndex: 10000,
                        primaryColor: '#68D391',
                    },
                }}
                locale={{
                    back: 'Voltar',
                    close: 'Fechar',
                    last: 'Fim',
                    next: 'Próximo',
                    open: 'Abrir diálogo',
                    skip: 'Pular',
                }}
            />
            {children}
        </TourContext.Provider>
    );
};
