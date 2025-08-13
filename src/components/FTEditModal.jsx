'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack, 
  useToast,
} from '@chakra-ui/react';
import { DialogModal } from './DialogModal';

// serviços já existentes
import {
  registrarFrente,
  editarFrente,
  removerFrente,
} from '../services/frentesTrabalho';

const empresaId = JSON.parse(localStorage.getItem('user'))?.empresaId ?? 0;

const frenteInicial = {
  id: 0,
  nome: '',
  empresaId,
};

/**
 * FTEditModal
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - frente: objeto frente para edição (se vier com id) ou undefined/null para criação
 * - onSaved: callback opcional disparado após salvar/excluir com sucesso (ex: recarregar lista)
 */
export const FTEditModal = ({ isOpen, onClose, frente, onSaved }) => {
  const toast = useToast();

  // memo p/ evitar recriar entre renders
  const initial = useMemo(
    () =>
      frente && frente.id
        ? { ...frente }
        : { ...frenteInicial, empresaId }, // garante empresaId atual
    [frente]
  );

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const modoEdicao = !!form?.id; // se tiver id > 0, está editando

  // sempre que abrir ou prop mudar, reseta o form
  useEffect(() => {
    if (isOpen) setForm(initial);
  }, [isOpen, initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form?.nome?.trim()) {
      toast({
        title: 'Informe o nome da frente',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    try {
      setSaving(true);

      if (modoEdicao) {
        await editarFrente(form.id, form);
        toast({ title: 'Frente atualizada', status: 'success', duration: 2000 });
      } else {
        // garantir id=0 na criação
        const payload = { ...form, id: 0, empresaId };
        await registrarFrente(payload);
        toast({ title: 'Frente criada', status: 'success', duration: 2000 });
      }

      onSaved?.(); // ex: listarFrentes()
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao salvar frente', status: 'error', duration: 2500 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!modoEdicao) return;
    try {
      setDeleting(true);
      await removerFrente(form.id);
      toast({ title: 'Frente removida', status: 'success', duration: 2000 });
      onSaved?.();
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: 'Erro ao remover frente', status: 'error', duration: 2500 });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DialogModal
      isOpen={isOpen}
      onClose={onClose}
      title={modoEdicao ? 'Editar Frente de Trabalho' : 'Adicionar Frente de Trabalho'}
      onSave={handleSave}
      onDelete={modoEdicao ? handleDelete : null}
      showDelete={modoEdicao}
      isSaving={saving}
      isDeleting={deleting}
    >
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nome da frente</FormLabel>
          <Input
            name="nome"
            value={form?.nome || ''}
            onChange={handleChange}
            placeholder="Ex.: Fiscal, DP, Contábil..."
          />
        </FormControl>        
      </Stack>
    </DialogModal>
  );
};
