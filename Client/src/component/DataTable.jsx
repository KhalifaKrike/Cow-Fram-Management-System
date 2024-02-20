
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Heading, Center, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import generateUniqueId from './generateUniqueId';
import { useState } from 'react';
import UpdateFormModalCow from './modal/UpdateFormModalCow';
import UpdateFormModalMedicalExams from './modal/UpdateFormModalMedicalExams';
import UpdateFormModalBirths from './modal/UpdateFormModalBirths';
import UpdateFormModalMilk from './modal/UpdateFormModalMilk';

export default function DataTable({ data, selectedTabThead, keys, deleteData, newEntry, setNewEntry, selectedTab, updateData, url }) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCowId, setSelectedCowId] = useState(false);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleDelete = (id) => {
        setSelectedCowId(id);
        setIsDeleteModalOpen(true);
    };
    const confirmDelete = () => {
        deleteData(selectedCowId);
        setIsDeleteModalOpen(false);
    };
    const handleUpdate = (entry) => {
        setSelectedCowId(entry[keys[0]]);
        setNewEntry(entry);
        setIsUpdateModalOpen(true);
    };
    const confirmUpdate = () => {
        updateData(selectedCowId);
        setIsUpdateModalOpen(false);
    };
    return (
        <>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        {selectedTabThead.map(tabselected => <Th key={generateUniqueId()}>{tabselected}</Th>)}
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.length > 0 ? data.map(entry => (
                        <Tr key={generateUniqueId()}>

                            {keys.map(key => <Td key={`${entry[key]}${generateUniqueId()}`}>{entry[key]}</Td>)}

                            <Td>
                                <Button colorScheme="red" onClick={() => handleDelete(entry[keys[0]])}>Delete</Button>
                                <Button ml={2} onClick={() => handleUpdate(entry)}>Update</Button>
                            </Td>
                        </Tr>
                    )) : <Tr><td colSpan={5}>
                        <Center>
                            <Heading mb={4} size={20} >NO DATA</Heading>
                        </Center>
                    </td></Tr>}
                </Tbody>
            </Table>


            {selectedTab === 'cow' ? <UpdateFormModalCow isOpen={isUpdateModalOpen}
                setIsOpen={setIsUpdateModalOpen}
                newEntry={newEntry}
                setNewEntry={setNewEntry}
                onSubmit={confirmUpdate} /> :
                selectedTab === 'medicalExam' ? <UpdateFormModalMedicalExams isOpen={isUpdateModalOpen}
                    setIsOpen={setIsUpdateModalOpen}
                    newEntry={newEntry}
                    setNewEntry={setNewEntry}
                    onSubmit={confirmUpdate}
                    url={url} /> :
                selectedTab === 'birth' ? <UpdateFormModalBirths isOpen={isUpdateModalOpen}
                        setIsOpen={setIsUpdateModalOpen}
                        newEntry={newEntry}
                        setNewEntry={setNewEntry}
                        onSubmit={confirmUpdate}
                        url={url} /> : <UpdateFormModalMilk isOpen={isUpdateModalOpen}
                                        setIsOpen={setIsUpdateModalOpen}
                                        newEntry={newEntry}
                                        setNewEntry={setNewEntry}
                                        onSubmit={confirmUpdate}
                                        url={url} />}


            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={confirmDelete}>Delete</Button>
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

