// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext';import { ContratoProvider } from './ContratosContext';
 import { UsuariosProvider } from './UsuariosContext';
;

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>
            <UsuariosProvider>
                <ContratoProvider>
                    {children}
                </ContratoProvider>
            </UsuariosProvider>
        </ClienteProvider>
    );
};
