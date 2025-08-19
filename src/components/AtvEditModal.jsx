'use client';
import { useEffect, useState } from 'react';
import {
  FormControl, FormLabel, Input, Select, Stack, Button, HStack, useToast
} from '@chakra-ui/react';
import { DialogModal } from './DialogModal';

// use os seus services diretos (igual no hook)
import {
  registrarAtividade,
  editarAtividade,
  removerAtividade,
} from '../services/atividadesService';

// mesmo shape que você já tem
const atividadeInicial = {
  id: 0,
  nome: '',
  tipo: 1,
  periodo: 1,
  intervaloEmDias: 0,
  proximaExecucao: null,
  empresaId: JSON.parse(localStorage.getItem('user'))?.empresaId,
  instrucao: '',
  frenteDeTrabalhoIds: [],
};

export const AtvEditModal = ({
  isOpen,
  onClose,
  atividade,        // se vier com id -> edição; se null/undefined -> criação
  onSaved,          // callback opcional para pai recarregar lista
}) => {
  const toast = useToast();
  const [form, setForm] = useState(atividade ?? atividadeInicial);
  const modoEdicao = !!atividade?.id;
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // quando abrir ou quando a prop mudar, reseta o form
  useEffect(() => {
    if (isOpen) {
      setForm(atividade ? { ...atividade } : { ...atividadeInicial });
    }
  }, [isOpen, atividade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsed = value;

    if (['tipo', 'periodo', 'intervaloEmDias'].includes(name)) {
      parsed = value === '' ? '' : Number(value);
    }
    // você já usa string pura para datetime-local; mantemos assim
    setForm((prev) => ({ ...prev, [name]: parsed }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (modoEdicao) {
        await editarAtividade(form.id, form);
        toast({ title: 'Atividade atualizada', status: 'success', duration: 2000 });
      } else {
        const payload = { ...form, id: 0 };
        await registrarAtividade(payload);
        toast({ title: 'Atividade criada', status: 'success', duration: 2000 });
      }
      onSaved?.(); // pai pode chamar listarAtividades()
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao salvar', status: 'error', duration: 2500 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!modoEdicao) return;
    try {
      setDeleting(true);
      await removerAtividade(form.id);
      toast({ title: 'Atividade removida', status: 'success', duration: 2000 });
      onSaved?.();
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao remover', status: 'error', duration: 2500 });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title={modoEdicao ? 'Editar Atividade' : 'Adicionar Atividade'}
      // Passa os handlers internos
      onSave={handleSave}
      onDelete={modoEdicao ? handleDelete : null}
      showDelete={modoEdicao}
      isSaving={saving}        // caso seu DialogModal aceite loading
      isDeleting={deleting}    // opcional
    >
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            name="nome"
            value={form?.nome || ''}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Select
            name="tipo"
            value={form?.tipo ?? 1}
            onChange={handleChange}
          >
            <option value={1}>Única</option>
            <option value={2}>Recorrente</option>
          </Select>
        </FormControl>
        {form?.tipo === 2 && ( //só visivel quando atividade for recorrente
          <>
            <FormControl>
              <FormLabel>Período</FormLabel>
              <Select
                name="periodo"
                value={form?.periodo ?? ''}
                onChange={handleChange}
              >
                <option value="">Selecione um período</option>
                <option value={1}>Diário</option>
                <option value={2}>Semanal</option>
                <option value={3}>Quinzenal</option>
                <option value={4}>Mensal</option>
                <option value={5}>Semestral</option>
                <option value={6}>Personalizado</option>
              </Select>
            </FormControl>

            {form?.periodo === 6 && (
              <FormControl>
                <FormLabel>Intervalo em dias</FormLabel>
                <Input
                  type="number"
                  name="intervaloEmDias"
                  min={1}
                  value={form?.intervaloEmDias ?? ''}
                  onChange={handleChange}
                />
              </FormControl>
            )}

            <FormControl>
              <FormLabel>Inicio da recorrência</FormLabel>
              <Input
                type="datetime-local"
                name="proximaExecucao"
                value={form?.proximaExecucao || null}
                onChange={handleChange}
              />
            </FormControl>
          </>
        )}
        <FormControl>
          <FormLabel>Instrução</FormLabel>
          <Input
            name="instrucao"
            value={form?.instrucao || ''}
            onChange={handleChange}
          />
        </FormControl>
      </Stack>

      {/* Se quiser botões custom no rodapé do modal ao invés do DialogModal,
          dá pra expor e usar aqui:
      <HStack justify="flex-end" mt={4}>
        <Button onClick={onClose} variant="ghost">Cancelar</Button>
        {modoEdicao && (
          <Button colorScheme="red" onClick={handleDelete} isLoading={deleting}>
            Excluir
          </Button>
        )}
        <Button colorScheme="blue" onClick={handleSave} isLoading={saving}>
          Salvar
        </Button>
      </HStack>
      */}
    </DialogModal>
  );
}
