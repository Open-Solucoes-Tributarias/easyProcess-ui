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
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Flex w="100%" justifyContent="space-between" alignItems="center">
                        {showDelete && (
                            <Button variant="text" color="red" onClick={onDelete}>
                                Deletar
                            </Button>
                        )}
                        <Flex gap={3}>
                            <Button variant="ghost" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme="blue" onClick={onSave}>
                                Salvar
                            </Button>
                        </Flex>
                    </Flex>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};
