"use client";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { DialogModal } from "../../../components/DialogModal";

export const ModalEditarAtv = ({open, setOpen}) => {
    return (
        <DialogModal
         isOpen={open}
         onClose={() => setOpen(false)}
        // title={modoEdicao ? "Editar Clientes" : "Adicionar Clientes"}
        // onSave={handleSubmit}
        // onDelete={modoEdicao ? () => console.log("Deletar:", clienteSelecionado) : null}
        // showDelete={modoEdicao}
        >
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <Input
                    // value={clienteSelecionado?.nomeFantasia || ''}
                    // onChange={(e) =>
                    //     setUsuarioSelecionado((prev) => ({ ...prev, nomeFantasia: e.target.value }))
                    // }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Razão Social</FormLabel>
                    <Input
                    // value={clienteSelecionado?.razaoSocial || ''}
                    // onChange={(e) =>
                    //     setUsuarioSelecionado((prev) => ({ ...prev, razaoSocial: e.target.value }))
                    // }
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>CNPJ</FormLabel>
                    <Input
                    // value={clienteSelecionado?.cnpj || ''}
                    // onChange={(e) =>
                    //     setUsuarioSelecionado((prev) => ({ ...prev, cnpj: e.target.value }))
                    // }
                    />
                </FormControl>
                {/* {modoEdicao &&
                    <FormControl>
                        <FormLabel>Data de cadastro</FormLabel>
                        <Input
                            value={clienteSelecionado?.dataCadastro || ''}
                            onChange={(e) =>
                                setUsuarioSelecionado((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                    </FormControl>
                } */}
            </Stack>
        </DialogModal>

    );
};
