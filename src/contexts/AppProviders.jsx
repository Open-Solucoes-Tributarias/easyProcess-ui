// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext'; import { UsuariosProvider } from './UsuariosContext';
;

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>
            <UsuariosProvider>
                {children}
            </UsuariosProvider>
        </ClienteProvider>
    );
};
