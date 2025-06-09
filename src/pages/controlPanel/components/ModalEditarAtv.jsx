"use client";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Stack, Text, Grid, GridItem, Avatar, Button, AvatarGroup, Flex, Textarea, Select, List, ListItem, Accordion, AccordionItem, AccordionIcon, AccordionPanel, AccordionButton, Card, CardHeader, Heading, CardBody, StackDivider, Box, Tag, TagLabel, GenericAvatarIcon, Divider } from "@chakra-ui/react";
import { DialogModal } from "../../../components/DialogModal";
import { registerControleAtv } from "../../../services/controleAtvService";
import { getMovimentacoesAtv } from "../../../services/movimentacoesAtvService";
import { dateAndHrConverter, dateConverter } from "../../../utils/utils";

export const ModalEditarAtv = ({ open, setOpen, atvSelecionada }) => {

    const [atividade, setAtividade] = useState({
        id: 0,
        contratoId: 0,
        atividadeId: 0,
        usuarioDelegadoId: 0,
        sequencia: 0,
        descricaoCustomizada: "",
        dataLimite: ""
    });
    const [controleAtv, setControleAtv] = useState(
        {
            atividadeContratoId: atvSelecionada?.id,
            dataHora: "",
            observacao: "",
            anexo: ""
        }
    );
    console.log('dados a serem enviados', controleAtv)

    const [movimentacoesAtv, setMovimentacoesAtv] = useState([]);

    const handleChange = (e) => { //atualiza campos do controle de atividade
        const { name, value } = e.target;
        setControleAtv((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async () => {
        try {
            await registerControleAtv(controleAtv);
        } catch (error) {
            console.error('erro ao enviar controle de atividade')
        }
    }

    console.log('atividade recebi no modal edição', atvSelecionada)

    const movimentacoesAtividade = async () => {
        try {
            const data = await getMovimentacoesAtv(atvSelecionada?.id);
            setMovimentacoesAtv(data);

        } catch (error) {
            console.error('não foram carregadas movimentacoes')
        }
    }
console.log('lista de movimentacoes', movimentacoesAtv);
    useEffect(() => {
        setAtividade(atvSelecionada);
        movimentacoesAtividade();
    }, [atvSelecionada]);

    return (
        <DialogModal
            isOpen={open}
            size='5xl'
            onClose={() => setOpen(false)}
            title={'Detalhes da atividade'}
        // onSave={handleSubmit}
        // onDelete={modoEdicao ? () => console.log("Deletar:", clienteSelecionado) : null}
        // showDelete={modoEdicao}
        >
            <Grid templateColumns="2fr 1fr" gap={2}>
                <GridItem>
                    <Stack spacing={2}>
                        <FormControl>
                            {/* <FormLabel>Atividade</FormLabel> */}
                            <Input
                                readOnly
                                value={atividade?.descricaoCustomizada}
                            />

                        </FormControl>

                        {/* Controle de atividade */}
                        <Accordion allowToggle>
                            <AccordionItem border='1px solid' borderColor={'gray.200'} borderRadius={10}>
                                <AccordionButton gap={2}>
                                    <AccordionIcon />
                                    Registrar movimentação
                                </AccordionButton>
                                <AccordionPanel>
                                    <Stack>
                                        <FormControl>
                                            <FormLabel>Data atualização</FormLabel>
                                            <Input type='datetime-local' name="dataHora" value={controleAtv.dataHora} onChange={handleChange} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Anotação</FormLabel>
                                            <Textarea
                                                resize='none'
                                                name="observacao"
                                                rows={5}
                                                value={controleAtv?.observacao}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Link Documentos</FormLabel>
                                            <Input name="anexo" value={controleAtv?.anexo} onChange={handleChange} />
                                        </FormControl>
                                        <Flex gap={3} justifyContent='left'>
                                            <Button colorScheme="blue" onClick={onSubmit}>
                                                Salvar
                                            </Button>
                                        </Flex>                            
                        </Stack>

                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        
                        {/* lista de movimentações da atividade */}
                        <Card border='1px solid' borderColor={'gray.200'} borderRadius={10} boxShadow='none'>
                            <CardHeader bgColor='gray.100' p={2}>
                                <Heading size={20}>Registro de Atividades</Heading>
                            </CardHeader>
                            <Divider />
                            <CardBody maxHeight={200} overflowY='auto'>
                                <Stack divider={<StackDivider />} spacing={4}>
                                {movimentacoesAtv.map((mov, index) => (
                                    <Box>
                                        <Heading size='xs'>
                                          {dateAndHrConverter(mov?.dataHora)}
                                        </Heading>
                                        <Text fontSize='sm'>
                                            {mov?.observacao}
                                        </Text>
                                         <Text fontSize='sm'>
                                            {mov?.anexo || "link não atribuido"}
                                        </Text>
                                    </Box>
                                    ))}
                                </Stack>
                            </CardBody>
                        </Card>

                    </Stack>
                </GridItem>
                <GridItem>
                    {/* border='1px solid' borderColor={'gray.200'} borderRadius={10} p={2} */}
                    <Flex direction='column' gap={2}>
                        <FormControl>
                            <Input type='datetime-local' name="dataLimite" value={atvSelecionada.dataLimite} readOnly />
                        </FormControl>
                        <Stack direction='column'>                           
                            <Tag size='lg' borderRadius='full'>
                                <Avatar
                                    src={<GenericAvatarIcon />}
                                    size='xs'
                                    name='responsavel'
                                    ml={-1}
                                    mr={3}
                                />
                                <TagLabel>Responsável</TagLabel>
                            </Tag>                          
                        </Stack>
                    </Flex>
                </GridItem>
            </Grid>
        </DialogModal>

    );
};
