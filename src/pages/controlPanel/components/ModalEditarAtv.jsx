"use client";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Grid,
  GridItem,
  Avatar,
  Button,
  Flex,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Box,
  Tag,
  TagLabel,
  Divider,
  Link
} from "@chakra-ui/react";
import { DialogModal } from "../../../components/DialogModal";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { GenericAvatarIcon } from "@chakra-ui/icons";
import { dateAndHrConverter } from "../../../utils/utils";
import { useControleAtividades } from "../../../contexts/ControleAtividadesContext";
import { useAtividadesContrato } from "../../../contexts/AtividadesContratoContext";

export const ModalEditarAtv = ({ open, setOpen, atvSelecionada }) => {
  const [atividade, setAtividade] = useState({});

  const {
    controleAtv,
    setControleAtv,
    handleChangeControle,
    salvarControleAtividade,
    movimentacoesAtv,
    listarMovimentacoesAtividade,
    controleAtvInicial
  } = useControleAtividades();

  const { excluirAtividadeContrato } = useAtividadesContrato();

  useEffect(() => {
    if (atvSelecionada?.id) {
      setAtividade(atvSelecionada);
      setControleAtv({ ...controleAtvInicial, atividadeContratoId: atvSelecionada.id });
      listarMovimentacoesAtividade(atvSelecionada.id);
    }
  }, [atvSelecionada]);

  return (
    <DialogModal
      isOpen={open}
      size="5xl"
      onClose={() => setOpen(false)}
      title={"Detalhes da atividade"}
      onDelete={() => excluirAtividadeContrato(atividade?.id, atividade?.contratoId )}
    >
      <Grid templateColumns="2fr 1fr" gap={2}>
        <GridItem>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Descrição da atividade</FormLabel>
              <Input readOnly value={atividade?.descricaoCustomizada || ""} />
            </FormControl>

            {/* Formulário de movimentação */}
            <Accordion allowToggle>
              <AccordionItem border="1px solid" borderColor="gray.200" borderRadius={10}>
                <AccordionButton gap={2}>
                  <AccordionIcon />
                  Registrar movimentação
                </AccordionButton>
                <AccordionPanel>
                  <Stack>
                    <FormControl>
                      <FormLabel>Data atualização</FormLabel>
                      <Input
                        type="datetime-local"
                        name="dataHora"
                        value={controleAtv.dataHora}
                        onChange={handleChangeControle}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Anotação</FormLabel>
                      <Textarea
                        resize="none"
                        name="observacao"
                        rows={5}
                        value={controleAtv.observacao}
                        onChange={handleChangeControle}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Link Documentos</FormLabel>
                      <Input
                        name="anexo"
                        value={controleAtv.anexo}
                        onChange={handleChangeControle}
                      />
                    </FormControl>
                    <Flex gap={3} justifyContent="left">
                      <Button colorScheme="blue" onClick={salvarControleAtividade}>
                        Salvar
                      </Button>
                    </Flex>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            {/* Lista de movimentações */}
            <Card border="1px solid" borderColor="gray.200" borderRadius={10} boxShadow="none">
              <CardHeader bgColor="gray.100" p={2}>
                <Heading size={20} pl={2}>
                  Movimentações
                </Heading>
              </CardHeader>
              <Divider />
              <CardBody maxHeight={200} overflowY="auto">
                <Stack divider={<StackDivider />} spacing={4}>
                  {movimentacoesAtv.map((mov, index) => (
                    <Box key={index}>
                      <Heading size="xs">{dateAndHrConverter(mov?.dataHora)}</Heading>
                      <Text fontSize="sm">{mov?.observacao}</Text>
                      <Link href={mov?.anexo || null} isExternal fontSize={13} color='blue.700'>
                        {mov?.anexo || "Arquivo não atribuido"} <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>

        <GridItem>
          <Flex direction="column" gap={2}>
             <FormControl>
              <FormLabel>Prazo limite</FormLabel>
              <Input
                type="datetime-local"
                name="dataLimite"
                value={atvSelecionada?.dataLimite || ""}
                readOnly
              />
            </FormControl>
            <Stack direction="column">
              <Tag size="lg" borderRadius="full">
                <Avatar
                  icon={<GenericAvatarIcon />}
                  size="xs"
                  name="responsável"
                  ml={-1}
                  mr={3}
                />
                <TagLabel>{atvSelecionada?.nomeUsuarioDelegado}</TagLabel>
              </Tag>
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </DialogModal>
  );
};
