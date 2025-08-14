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

export const AtividadeContrato = ({ isOpen, onClose, contratoSelecionado }) => {
  const {
    atividadeSelecionada,
    setAtividadeSelecionada,
    salvarAtividadeContrato,
    handleChangeAtvContrato,
    atividadeInicial,
  } = useAtividadesContrato();

  const { atividades } = useAtividades();
  const { usuarios, listarUsuarios } = useUsuarios();

  useEffect(() => {
    if (isOpen) {
      setAtividadeSelecionada({...atividadeInicial,
        contratoId: contratoSelecionado?.id ?? 0,
        usuarioDelegadoId: contratoSelecionado?.supervisorUsuarioId || null,

      });
      listarUsuarios(); // carrega responsáveis
    }
  }, [isOpen]);

  console.log('contrato selecionado', contratoSelecionado)

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
          <Input
            name='contratoId'
            type='text'
            value={contratoSelecionado?.descricao}
            disabled
          />
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
            
              <Select
                name="usuarioDelegadoId"
                value={atividadeSelecionada?.usuarioDelegadoId || ''}
                onChange={handleChangeAtvContrato}               
              >
                <option value="">Selecione o responsável</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </Select>
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
          <FormControl display={'none'}>
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
