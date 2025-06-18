'use client';
import {
    Flex,
    Button,
    FormControl,
    FormLabel,
    Input,
    Grid,
    GridItem,
    Text,
    List,
    ListItem,
    IconButton,
    Stack,
    Box,
    Select,
    CheckboxGroup,
    Checkbox,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxReader } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa';
import { getTipoAtvLabel } from '../../../utils/labelUtils';
import { DialogModal } from '../../../components/DialogModal';
import { Informativo } from '../../../components/Informativo';
import { useAtividades } from '../../../contexts/AtividadesContext';
import { useFrentes } from '../../../contexts/FrentesContext';

export const Atividades = () => {
    const {
        atividades,
        atividadeAtual,
        atividadeIsEditOpen,
        atividadeModoEdicao,
        abrirEdicaoAtividade,
        abrirCadastroAtividade,
        salvarAtividade,
        deletarAtividade,
        handleChangeAtividade,
        setAtividadeIsEditOpen,
    } = useAtividades();

    const { frentes } = useFrentes();

    const ListaAtividades = () => (
        <List spacing={3} w="100%">
            {atividades.map((atividade, index) => (
                <ListItem
                    key={index}
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    border="1px solid"
                    borderColor="#d0d0d0"
                    px={3}
                    py={2}
                    borderRadius="md"
                >
                    <Flex align="center" gap={2} onClick={() => abrirEdicaoAtividade(atividade)}>
                        <Flex align="center">
                            <RxReader />
                            <Box ml="3">
                                <Text fontWeight={500} color="gray.600" fontSize={14}>
                                    {atividade?.nome}
                                </Text>
                                <Text fontSize={13}>Tipo: {getTipoAtvLabel(atividade?.tipo)}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <IconButton
                        aria-label="Editar"
                        icon={<BsThreeDotsVertical />}
                        variant="outline"
                        size="sm"
                        onClick={() => abrirEdicaoAtividade(atividade)}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10}>
                <GridItem>
                    <Text as="b" fontSize="xl">
                        Atividades
                    </Text>
                    <Button
                        variant="text"
                        color="#68D391"
                        leftIcon={<FaPlus />}
                        onClick={abrirCadastroAtividade}
                    >
                        Adicionar
                    </Button>

                    <Flex style={styles.content}>
                        <ListaAtividades />
                    </Flex>
                </GridItem>

                <GridItem>
                    <Informativo
                        tipo="info"
                        titulo="Gerenciamento de Atividades"
                        mensagem="Atividades representam ações recorrentes ou pontuais vinculadas a frentes de trabalho. Você pode definir tipo, instrução da atividade e recorrência."
                    />
                </GridItem>
            </Grid>

            <DialogModal
                isOpen={atividadeIsEditOpen}
                onClose={() => setAtividadeIsEditOpen(false)}
                title={atividadeModoEdicao ? 'Editar Atividade' : 'Adicionar Atividade'}
                onSave={salvarAtividade}
                onDelete={atividadeModoEdicao ? () => deletarAtividade(atividadeAtual?.id) : null}
                showDelete={atividadeModoEdicao}
            >
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            name="nome"
                            value={atividadeAtual?.nome || ''}
                            onChange={handleChangeAtividade}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tipo</FormLabel>
                        <Select
                            name="tipo"
                            value={atividadeAtual?.tipo}
                            onChange={handleChangeAtividade}
                        >
                            <option value={1}>Única</option>
                            <option value={2}>Recorrente</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Recorrência</FormLabel>
                        <Input
                            name="recorrencia"
                            value={atividadeAtual?.recorrencia || ''}
                            onChange={handleChangeAtividade}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Instrução</FormLabel>
                        <Input
                            name="instrucao"
                            value={atividadeAtual?.instrucao || ''}
                            onChange={handleChangeAtividade}
                        />
                    </FormControl>
                    {/* //lista de frentes de trabalho */}
                    <CheckboxGroup
                        colorScheme="green"
                        value={atividadeAtual.frenteDeTrabalhoIds.map(String)}
                        onChange={(valoresSelecionados) =>
                            handleChangeAtividade({
                                target: {
                                    name: 'frenteDeTrabalhoIds',
                                    value: valoresSelecionados,
                                },
                            })
                        }
                    >
                        <Text>Atribuir atividade à Frente de trabalho</Text>
                        <Stack spacing={[1, 3]} direction={['column', 'row']} wrap="wrap">
                            {frentes.map((frente, index) => (
                                <Checkbox key={index} value={String(frente?.id)}>
                                    {frente?.nome}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </Stack>
            </DialogModal>
        </>
    );
};

const styles = {
    content: {
        width: '100%',
        minHeight: '50vh',
        height: '100%',
        overflowY: 'auto',
        border: '1px solid',
        borderColor: '#d0d0d0',
        borderRadius: 10,
        paddingInline: 30,
        paddingBlock: 30,
    },
};
