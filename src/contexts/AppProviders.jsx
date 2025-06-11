// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext';import { AtividadesProvider } from './AtividadesContext';
 import { AtividadesContratoProvider } from './AtividadesContratoContext';
import { ContratoProvider } from './ContratosContext';
import { ControleAtividadesProvider } from './ControleAtividadesContext';
import { FrentesProvider } from './FrentesContext';
import { UsuariosProvider } from './UsuariosContext';

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>
            <UsuariosProvider>
                <ContratoProvider>
                    <AtividadesContratoProvider>
                        <ControleAtividadesProvider>
                            <FrentesProvider>
                                <AtividadesProvider>
                                    {children}
                                </AtividadesProvider>
                            </FrentesProvider>
                        </ControleAtividadesProvider>
                    </AtividadesContratoProvider>
                </ContratoProvider>
            </UsuariosProvider>
        </ClienteProvider>
    );
};
