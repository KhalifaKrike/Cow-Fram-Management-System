import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';


export default function UpdateFormModalCow({ isOpen, setIsOpen, onSubmit, newEntry, setNewEntry }) {


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        setNewEntry({});
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Cow Information</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <FormControl mb={4}>
                            <FormLabel>Entry Date</FormLabel>
                            <Input
                                type="date"
                                value={newEntry.EntryDate || ''}
                                isRequired
                                onChange={e => setNewEntry({ ...newEntry, EntryDate: e.target.value })}
                            />
                            <FormLabel mt={2}>Birth Date (not required)</FormLabel>
                            <Input
                                type="date"
                                value={newEntry.BirthDate || ''}
                                onChange={e => setNewEntry({ ...newEntry, BirthDate: e.target.value })}
                            />
                            <FormLabel mt={2}>Breed</FormLabel>
                            <Select
                                value={newEntry.Breed || ''}
                                onChange={e => setNewEntry({ ...newEntry, Breed: e.target.value })}
                                isRequired
                            >
                                <option value="">Select Breed</option>
                                <option value="Montbéliarde">Montbéliarde</option>
                                <option value="Holstein">Holstein</option>
                            </Select>
                        </FormControl>
                        <Button mt={4} colorScheme="teal" type="submit">Update</Button>
                        <Button mt={4} ml={5} variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


