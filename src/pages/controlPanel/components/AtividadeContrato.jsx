'use client';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Flex,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { DialogModal } from '../../../components/DialogModal';
import { useAtividadesContrato } from '../../../hooks/useAtividadesContrato';
import { useContrato } from '../../../hooks/useContratos';
import { useEffect } from 'react';
import { useAtividades } from '../../../hooks/useAtividades';
import { useUsuarios } from '../../../hooks/useUsuarios';

export const AtividadeContrato = ({ isOpen, onClose }) => {
  const {
    atividadeSelecionada,
    setAtividadeSelecionada,
    salvarAtividadeContrato,
    handleChangeAtvContrato,
    atividadeInicial,
  } = useAtividadesContrato();

  const { atividades } = useAtividades();
  const { contratosGeral, listarContratos } = useContrato();
  const { usuarios, listarUsuarios } = useUsuarios();

  useEffect(() => {
    if (isOpen) {
      setAtividadeSelecionada(atividadeInicial);
      listarContratos(null, true); // força carregar todos os contratos
      listarUsuarios(); // carrega responsáveis
    }
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Atividade no Contrato"
      size='3xl'
      onSave={async () => {
        await salvarAtividadeContrato();
        onClose();
      }}
    >
      <Stack spacing={4}>
        {/* Contrato */}
        <FormControl>
          <FormLabel>Contrato</FormLabel>
          <Select
            name="contratoId"
            value={atividadeSelecionada?.contratoId || ''}
            onChange={handleChangeAtvContrato}
          >
            <option value="">Selecione um contrato</option>
            {contratosGeral.map((contrato) => (
              <option key={contrato.id} value={contrato.id}>
                {contrato.descricao || `Contrato ${contrato.id}`}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Atividade */}
        <FormControl>
          <FormLabel>Selecionar Atividade</FormLabel>
          <Select
            name="atividadeId"
            value={atividadeSelecionada?.atividadeId || ''}
            onChange={handleChangeAtvContrato}
          >
            <option value="">Selecione uma atividade</option>
            {atividades.map((atividade) => (
              <option key={atividade.id} value={atividade.id}>
                {atividade.nome}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Descrição customizada */}
        <FormControl>
          <FormLabel>Descrição customizada</FormLabel>
          <Input
            name="descricaoCustomizada"
            value={atividadeSelecionada.descricaoCustomizada || ''}
            onChange={handleChangeAtvContrato}
          />
        </FormControl>

        {/* Data limite */}
        <Flex direction='row' gap={3}>
          <FormControl>
            <FormLabel>Data limite</FormLabel>
            <Input
              name="dataLimite"
              type='datetime-local'
              value={
                atividadeSelecionada?.dataLimite ||  '' }
              onChange={handleChangeAtvContrato}
            />
          </FormControl>

          {/* Delegado */}
          <FormControl>
            <FormLabel>Responsável</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Avatar size="xs" name={atividadeSelecionada?.nomeUsuarioDelegado}>
                  <AvatarBadge boxSize="1" bg="green.500" />
                </Avatar>
                                        
              </InputLeftElement>
              <Select
                name="usuarioDelegadoId"
                value={atividadeSelecionada?.usuarioDelegadoId || ''}
                onChange={handleChangeAtvContrato}
                pl="2.5rem"
              >
                <option value="">Selecione o responsável</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormControl>
        </Flex>

        {/* Status */}
        <Flex direction='row' gap={3}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              name="statusAtividade"
              value={atividadeSelecionada?.statusAtividade ?? ''}
              onChange={handleChangeAtvContrato}
            >
              <option value="">Selecione o status</option>
              <option value={0}>Pendente</option>
              <option value={1}>Em andamento</option>
              <option value={2}>Concluída</option>
              <option value={3}>Atrasada</option>
            </Select>
          </FormControl>

          {/* Sequência */}
          <FormControl>
            <FormLabel>Sequência</FormLabel>
            <Input
              type="number"
              name="sequencia"
              placeholder="Nº ordem da atividade"
              value={atividadeSelecionada?.sequencia || ''}
              onChange={handleChangeAtvContrato}
            />
          </FormControl>
        </Flex>
      </Stack>
    </DialogModal>
  );
};
