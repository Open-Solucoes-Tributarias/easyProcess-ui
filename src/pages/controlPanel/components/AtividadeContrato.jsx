'use client';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { DialogModal } from '../../../components/DialogModal';
import { useAtividadesContrato } from '../../../contexts/AtividadesContratoContext';
import { useContrato } from '../../../contexts/ContratosContext';
import { useEffect } from 'react';

export const AtividadeContrato = ({ isOpen, onClose }) => {
  const {
    atividadeSelecionada,
    setAtividadeSelecionada,
    salvarAtividadeContrato,
    handleChangeAtvContrato,
    atividadeInicial,
  } = useAtividadesContrato();

  const { contratos } = useContrato();

  useEffect(() => {
    if (isOpen) {
      setAtividadeSelecionada(atividadeInicial);
    }
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Atividade no Contrato"
      size="lg"
      onSave={async () => {
        await salvarAtividadeContrato();
        onClose();
      }}
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Contrato</FormLabel>
          <Select
            name="contratoId"
            value={atividadeSelecionada?.contratoId || ''}
            onChange={handleChangeAtvContrato}
          >
            <option value="">Selecione um contrato</option>
            {contratos.map((contrato) => (
              <option key={contrato.id} value={contrato.id}>
                {contrato.descricao || `Contrato ${contrato.id}`}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Descrição customizada</FormLabel>
          <Input
            name="descricaoCustomizada"
            value={atividadeSelecionada.descricaoCustomizada || ''}
            onChange={handleChangeAtvContrato}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Data limite</FormLabel>
          <Input
            name="dataLimite"
            type="date"
            value={atividadeSelecionada.dataLimite?.split('T')[0] || ''}
            onChange={handleChangeAtvContrato}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Delegado (usuário)</FormLabel>
          <Input
            name="nomeUsuarioDelegado"
            value={atividadeSelecionada.nomeUsuarioDelegado || ''}
            onChange={handleChangeAtvContrato}
          />
        </FormControl>
      </Stack>
    </DialogModal>
  );
};
