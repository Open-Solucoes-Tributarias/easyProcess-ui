import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Flex
} from "@chakra-ui/react";

export const DialogModal = ({ isOpen, onClose, title, children, onSave, onDelete, showDelete }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />

                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // evita recarregar a página
                        onSave();           // executa a função de salvar
                    }}
                >
                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Flex w="100%" justifyContent="space-between" alignItems="center">
                            <Flex>
                                {onDelete && (
                                    <Button variant="text" color="red" onClick={onDelete}>
                                        Deletar
                                    </Button>
                                )}
                            </Flex>
                            <Flex gap={3}>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme="blue" type="submit">
                                    Salvar
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>

    );
};
