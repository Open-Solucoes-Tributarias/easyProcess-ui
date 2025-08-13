// components/ContratoEditModalSmart.jsx
'use client';
import { useEffect, useMemo, useState, useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  HStack,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { DialogModal } from './DialogModal';

import {
  registrarContrato,
  editarContrato,
  removerContrato,
} from '../services/contratosService';

// Hooks internos
import { useUsuarios } from '../hooks/useUsuarios';
import { useCliente } from '../hooks/useClientes';

const empresaIdLS = JSON.parse(localStorage.getItem('user'))?.empresaId ?? 0;

const contratoInicial = {
  id: 0,
  clienteId: 0,
  empresaId: empresaIdLS,
  supervisorUsuarioId: 0,
  descricao: '',
  dataInicio: new Date().toISOString(),
  dataFim: new Date().toISOString(),
  nomeSupervisor: '',
};

/**
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - contrato: objeto para edição (se tiver id) ou null/undefined para criação
 * - onSaved?: () => void   // callback opcional para o pai recarregar a lista
 */
export const ContratoEditModal = ({
  isOpen,
  onClose,
  contrato,
  onSaved,
}) => {
  const toast = useToast();
  const fetchedRef = useRef(false);

  // Carrega usuários e clientes dentro do modal
  const { usuarios, listarUsuarios, usuarioLoading } = useUsuarios();
  const { clientes, listarClientes, clienteLoading } = useCliente();

    useEffect(() => {
        if (!isOpen) {
            fetchedRef.current = false; // reseta quando fechar
            return;
        }
        if (fetchedRef.current) return; // já buscou nessa abertura

        fetchedRef.current = true;

        if (usuarios.length === 0) listarUsuarios();
        if (clientes.length === 0) listarClientes();
    }, [
        isOpen,
        usuarios.length,
        clientes.length,
        listarUsuarios,  // memorizado
        listarClientes,
    ]);

  const initial = useMemo(
    () => (contrato && contrato.id ? { ...contrato } : { ...contratoInicial }),
    [contrato]
  );

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
//   const modoEdicao = !!form?.id;
  const modoEdicao = Number(form?.id) > 0;

  useEffect(() => {
    if (isOpen) setForm(initial);
  }, [isOpen, initial]);

  // helpers de data
  const toDateInput = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');
  const fromDateInput = (yyyyMMdd) =>
    yyyyMMdd ? new Date(`${yyyyMMdd}T00:00:00`).toISOString() : '';

  const dataInicioLocal = toDateInput(form.dataInicio);
  const dataFimLocal = toDateInput(form.dataFim);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dataInicio') {
      setForm((p) => ({ ...p, dataInicio: fromDateInput(value) }));
      return;
    }
    if (name === 'dataFim') {
      setForm((p) => ({ ...p, dataFim: fromDateInput(value) }));
      return;
    }

    if (name === 'clienteId' || name === 'supervisorUsuarioId') {
      const num = value === '' ? 0 : Number(value);

      if (name === 'supervisorUsuarioId') {
        const u = usuarios.find((x) => x.id === num);
        setForm((p) => ({
          ...p,
          supervisorUsuarioId: num,
          nomeSupervisor: u?.nome ?? p.nomeSupervisor ?? '',
        }));
        return;
      }

      setForm((p) => ({ ...p, [name]: num }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const validar = () => {
    if (!form.clienteId || form.clienteId === 0) {
      toast({ title: 'Selecione o cliente', status: 'warning', duration: 2000 });
      return false;
    }
    if (!form.descricao?.trim()) {
      toast({ title: 'Informe a descrição do contrato', status: 'warning', duration: 2000 });
      return false;
    }
    if (form.dataInicio && form.dataFim && new Date(form.dataInicio) > new Date(form.dataFim)) {
      toast({ title: 'Data de início não pode ser maior que a data de fim', status: 'warning', duration: 2500 });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validar()) return;

    try {
      setSaving(true);
      if (modoEdicao) {
        await editarContrato(form.id, form);
        toast({ title: 'Contrato atualizado', status: 'success', duration: 2000 });
      } else {
        const payload = { ...form, id: 0, empresaId: empresaIdLS };
        await registrarContrato(payload);
        toast({ title: 'Contrato criado', status: 'success', duration: 2000 });
      }
      onSaved?.();
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao salvar contrato', status: 'error', duration: 2500 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!modoEdicao) return;
    try {
      setDeleting(true);
      await removerContrato(form.id);
      toast({ title: 'Contrato removido', status: 'success', duration: 2000 });
      onSaved?.();
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao remover contrato', status: 'error', duration: 2500 });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title={modoEdicao ? 'Editar Contrato' : 'Adicionar Contrato'}
      onSave={handleSave}
      onDelete={modoEdicao ? handleDelete : null}
      showDelete={modoEdicao}
      isSaving={saving}
      isDeleting={deleting}
    >
      <Stack spacing={4}>
        {/* Cliente (Select) */}
        <FormControl isRequired>
          <FormLabel>Cliente</FormLabel>
          <Select
            name="clienteId"
            value={form.clienteId || 0}
            onChange={handleChange}
            isDisabled={clienteLoading}
          >
            <option value={0} disabled>Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nomeFantasia || c.razaoSocial || `Cliente #${c.id}`}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Supervisor (usuário delegado) - Select */}
        <FormControl>
          <FormLabel>Supervisor (usuário delegado)</FormLabel>
          <Select
            name="supervisorUsuarioId"
            value={form.supervisorUsuarioId || 0}
            onChange={handleChange}
            isDisabled={usuarioLoading}
          >
            <option value={0}>Selecione um supervisor</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </Select>
        </FormControl> 

        {/* Datas */}
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Data de início</FormLabel>
            <Input
              type="date"
              name="dataInicio"
              value={dataInicioLocal}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Data de fim</FormLabel>
            <Input
              type="date"
              name="dataFim"
              value={dataFimLocal}
              onChange={handleChange}
            />
          </FormControl>
        </HStack>

        {/* Descrição */}
        <FormControl isRequired>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            name="descricao"
            value={form.descricao || ''}
            onChange={handleChange}
            placeholder="Ex.: descrição, escopo ou observação que identifica o contrato"
          />
        </FormControl>
      </Stack>
    </DialogModal>
  );
};
