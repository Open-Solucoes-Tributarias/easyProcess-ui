"use client";
import { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Grid,
  GridItem,
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
  Divider,
  Link,
  Select,
  InputGroup,
  InputLeftElement,
  Avatar,
  AvatarBadge
} from "@chakra-ui/react";
import { DialogModal } from "../../../components/DialogModal";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { GenericAvatarIcon } from "@chakra-ui/icons";
import { dateAndHrConverter } from "../../../utils/utils";
import { useControleAtividades } from "../../../contexts/ControleAtividadesContext";
import { useAtividadesContrato } from "../../../contexts/AtividadesContratoContext";
import { useUsuarios } from "../../../contexts/UsuariosContext";

export const ModalEditarAtv = ({ open, setOpen, atvSelecionada }) => {

  const {
    controleAtv,
    setControleAtv,
    handleChangeControle,
    salvarControleAtividade,
    movimentacoesAtv,
    listarMovimentacoesAtividade,
    controleAtvInicial
  } = useControleAtividades();

  const { atividadeSelecionada, setAtividadeSelecionada, excluirAtividadeContrato, handleChangeAtvContrato, salvarAtividadeContrato } = useAtividadesContrato();

  const { usuarios, listarUsuarios } = useUsuarios();

useEffect(() => {
  if (open && atvSelecionada?.id) {
    setAtividadeSelecionada(atvSelecionada);
    setControleAtv({ ...controleAtvInicial, atividadeContratoId: atvSelecionada.id });
    listarMovimentacoesAtividade(atvSelecionada.id);
  }
}, [open]);

  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <DialogModal
      isOpen={open}
      size="5xl"
      onClose={() => setOpen(false)}
      onSave={() => salvarAtividadeContrato()}
      title={"Detalhes da atividade"}
      onDelete={() => excluirAtividadeContrato(atividadeSelecionada?.id, atividadeSelecionada?.contratoId)}
    >
      <Grid templateColumns="2fr 1fr" gap={2}>
        <GridItem>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Descrição da atividade</FormLabel>
              <Input name="descricaoCustomizada" value={atividadeSelecionada?.descricaoCustomizada || ""} onChange={handleChangeAtvContrato} />
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
                      {/* <Text fontSize="sm">{mov?.usuarioId}</Text> */}
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
              <FormLabel>Responsável</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Avatar size="xs" name={atividadeSelecionada?.nomeUsuarioDelegado}>
                    <AvatarBadge boxSize="1" bg="green.500" />
                  </Avatar>
                </InputLeftElement>
                <Select
                  placeholder="Selecione o responsável"
                  name="usuarioDelegadoId"
                  value={atividadeSelecionada?.usuarioDelegadoId || ""}
                  onChange={handleChangeAtvContrato}
                  pl="2.5rem"
                >
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Prazo limite</FormLabel>
              <Input
                type="datetime-local"
                name="dataLimite"
                value={atividadeSelecionada?.dataLimite || ""}
                onChange={handleChangeAtvContrato}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Status da atividade"
                name="statusAtividade"
                value={atividadeSelecionada?.statusAtividade}
                onChange={handleChangeAtvContrato}
              >
                <option value={0}>Pendente</option>
                <option value={1}>Em andamento</option>
                <option value={2}>Concluída</option>
                <option value={3}>Atrasada</option>
              </Select>
            </FormControl>
             <FormControl>
              <FormLabel>Sequência</FormLabel>
              <Input
                type='number'
                name="sequencia"
                placeholder="Nº ordem da atividade"
                value={atividadeSelecionada?.sequencia}
                onChange={handleChangeAtvContrato}
              />
            </FormControl>

          </Flex>
        </GridItem>
      </Grid>
    </DialogModal>
  );
};
