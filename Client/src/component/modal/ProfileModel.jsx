import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useEditable } from '@chakra-ui/react';



export default function ProfileModel({ isOpen, setIsOpen }) {
    
    

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Email: Khalifa@gmail.com</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}