// components/AppProviders.jsx
import { ClienteProvider } from '../contexts/ClientesContext'; 
import { AtividadesProvider } from './AtividadesContext';
import { AtividadesContratoProvider } from './AtividadesContratoContext';
import { ContratoProvider } from './ContratosContext';
import { ControleAtividadesProvider } from './ControleAtividadesContext';
import { FrenteDeTrabalhoAtvProvider } from './FrentesAtividades';
import { FrentesProvider } from './FrentesContext';

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return (
        <ClienteProvider>         
                <ContratoProvider>
                    <AtividadesContratoProvider>
                        <ControleAtividadesProvider>
                            <FrentesProvider>
                                <AtividadesProvider>
                                    <FrenteDeTrabalhoAtvProvider>
                                        {children}
                                    </FrenteDeTrabalhoAtvProvider>
                                </AtividadesProvider>
                            </FrentesProvider>
                        </ControleAtividadesProvider>
                    </AtividadesContratoProvider>
                </ContratoProvider>        
        </ClienteProvider>
    );
};
