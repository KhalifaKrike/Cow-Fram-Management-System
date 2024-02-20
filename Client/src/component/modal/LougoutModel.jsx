import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";




export default function LougoutModel({ isOpen, setIsOpen, navigate }) {

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    const confirmLogout = () => {
        deleteCookie('jwt');
        navigate('/');
    }


    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm LogOut</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to logout ?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={confirmLogout}>Logout</Button>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}