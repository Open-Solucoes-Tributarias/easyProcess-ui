"use client";
import { useEffect, useMemo, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Flex,
    Select,
    InputGroup,
    InputLeftElement,
    Avatar,
    AvatarBadge
} from "@chakra-ui/react";
import { DialogModal } from "./DialogModal";
import { useUsuarios } from "../hooks/useUsuarios";

export const EditAtvModal = ({ open, setOpen, atvSelecionada, onConfirm }) => {
    const { usuarios, listarUsuarios } = useUsuarios();

    const initial = useMemo(
        () => ({
            id: atvSelecionada?.id ?? 0,
            contratoId: atvSelecionada?.contratoId ?? 0,
            atividadeId: atvSelecionada?.atividadeId ?? 0,
            usuarioDelegadoId: atvSelecionada?.usuarioDelegadoId ?? "",
            sequencia: atvSelecionada?.sequencia ?? "",
            statusAtividade: atvSelecionada?.statusAtividade ?? "",
            descricaoCustomizada: atvSelecionada?.descricaoCustomizada ?? "",
            dataLimite: atvSelecionada?.dataLimite ?? "",
            nomeUsuarioDelegado: atvSelecionada?.nomeUsuarioDelegado ?? ""
        }),
        [atvSelecionada]
    );

    const [draftAtv, setDraftAtv] = useState(initial);
    console.log('atividade atualizada', draftAtv)

    useEffect(() => {
        if (open) setDraftAtv(initial);
    }, [open, initial]);

    useEffect(() => {
        listarUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "usuarioDelegadoId") {
            const id = value === "" ? "" : Number(value);
            const user = usuarios.find(u => u.id === id);
            setDraftAtv(p => ({
                ...p,
                usuarioDelegadoId: id,
                nomeUsuarioDelegado: user?.nome || ""
            }));
            return;
        }

        if (name === "sequencia" || name === "statusAtividade") {
            setDraftAtv(p => ({ ...p, [name]: value === "" ? "" : Number(value) }));
            return;
        }

        if (name === "dataLimite") {
            setDraftAtv(p => ({ ...p, dataLimite: value ? new Date(value).toISOString() : "" }));
            return;
        }

        setDraftAtv(p => ({ ...p, [name]: value }));
    };

    const handleSave = () => {
        onConfirm && onConfirm(draftAtv); // objeto direto
        setOpen(false);
    };

    // valor para o <input type="datetime-local"> (sem função auxiliar)
    const dataLimiteLocal = draftAtv.dataLimite
        ? new Date(draftAtv.dataLimite).toISOString().slice(0, 16)
        : "";

    return (
        <DialogModal
            isOpen={open}
            size="4xl"
            onClose={() => setOpen(false)}
            onSave={handleSave}
            title="Detalhes da atividade"
        >
            <Flex direction='column' gap={2}>
                <Flex direction={{ base: 'column', sm: 'row' }} gap={2}>
                    <FormControl>
                        <FormLabel>Descrição da atividade</FormLabel>
                        <Input
                            name="descricaoCustomizada"
                            value={draftAtv.descricaoCustomizada}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl w={{ sm: '40%' }}>
                        <FormLabel>Responsável</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <Avatar size="xs" name={draftAtv?.nomeUsuarioDelegado}>
                                    <AvatarBadge boxSize="1" bg="green.500" />
                                </Avatar>
                            </InputLeftElement>
                            <Select
                                placeholder="usuário responsável"
                                name="usuarioDelegadoId"
                                value={draftAtv.usuarioDelegadoId === "" ? "" : Number(draftAtv.usuarioDelegadoId)}
                                onChange={handleChange}
                                pl="2.5rem"
                            >
                                {usuarios.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.nome}
                                    </option>
                                ))}
                            </Select>
                        </InputGroup>
                    </FormControl>
                </Flex>
                <Flex direction={{ base: 'column', sm: 'row' }} gap={2}>
                    <FormControl>
                        <FormLabel>Prazo limite</FormLabel>
                        <Input
                            type="datetime-local"
                            name="dataLimite"
                            value={dataLimiteLocal}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                            placeholder="Status da atividade"
                            name="statusAtividade"
                            value={draftAtv.statusAtividade === "" ? "" : Number(draftAtv.statusAtividade)}
                            onChange={handleChange}
                        >
                            <option value={0}>Pendente</option>
                            <option value={1}>Em andamento</option>
                            <option value={2}>Concluída</option>
                            <option value={3}>Atrasada</option>
                        </Select>
                    </FormControl>

                    <FormControl display={'none'}>
                        <FormLabel>Sequência</FormLabel>
                        <Input
                            type="number"
                            name="sequencia"
                            placeholder="Nº ordem da atividade"
                            value={draftAtv.sequencia}
                            onChange={handleChange}
                            disabled
                        />
                    </FormControl>
                </Flex>
            </Flex>
        </DialogModal>
    );
};
