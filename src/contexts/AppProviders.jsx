import { AtividadesContratoProvider } from './AtividadesContratoContext';
import { ControleAtividadesProvider } from './ControleAtividadesContext';
import { FrenteDeTrabalhoAtvProvider } from './FrentesAtividades';

export const AppProviders = ({ children }) => {
    //componente global de contexts providers para globalizar funcoes de CRUD na aplicação
    return ( 
                    <AtividadesContratoProvider>
                        <ControleAtividadesProvider>
                                    <FrenteDeTrabalhoAtvProvider>
                                        {children}
                                    </FrenteDeTrabalhoAtvProvider>
                        </ControleAtividadesProvider>
                    </AtividadesContratoProvider>
    );
};
