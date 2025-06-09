// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext'; import { AtividadesContratoProvider } from './AtividadesContratoContext';
import { ContratoProvider } from './ContratosContext';
import { ControleAtividadesProvider } from './ControleAtividadesContext';
import { UsuariosProvider } from './UsuariosContext';
;

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>
            <UsuariosProvider>
                <ContratoProvider>
                    <AtividadesContratoProvider>
                        <ControleAtividadesProvider>
                            {children}
                        </ControleAtividadesProvider>
                    </AtividadesContratoProvider>
                </ContratoProvider>
            </UsuariosProvider>
        </ClienteProvider>
    );
};
