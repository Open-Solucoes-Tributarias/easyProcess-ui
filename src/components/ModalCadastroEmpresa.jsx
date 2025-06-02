import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { createEmpresa } from '../services/companyService';

export const ModalCadastroEmpresa = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const toast = useToast();

  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [dataAssinaturaContrato, setDataAssinaturaContrato] = useState('');
  const [frenteDeTrabalhoIds, setFrenteDeTrabalhoIds] = useState([]);

  const handleSubmit = async () => {
    try {
      await createEmpresa({
        nome,
        cnpj,
        dataAssinaturaContrato,
        frenteDeTrabalhoIds,
        clienteId: null,
      });
      toast({
        title: 'Empresa cadastrada com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar empresa.',
        description: 'Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar nova empresa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={3}>
            <FormLabel>Nome</FormLabel>
            <Input
              ref={initialRef}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da empresa"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>CNPJ</FormLabel>
            <Input
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0001-00"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Data de Assinatura do Contrato</FormLabel>
            <Input
              type="date"
              value={dataAssinaturaContrato}
              onChange={(e) => setDataAssinaturaContrato(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Frentes de Trabalho</FormLabel>
            <Select
              placeholder="Selecione uma frente"
              onChange={(e) =>
                setFrenteDeTrabalhoIds([parseInt(e.target.value)])
              }
            >
              <option value="1">Opções setadas para teste</option>
              <option value="2">Trabalhista</option>
              <option value="3">Tributário</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant={'outlined'} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
