// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext';;

export const AppProviders = ({ children }) => {
    //compoente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>
            {children}
        </ClienteProvider>
    );
};
