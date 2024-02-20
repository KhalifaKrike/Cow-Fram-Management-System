import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import generateUniqueId from '../generateUniqueId';


export default function UpdateFormModalMedicalExams({ isOpen, setIsOpen, onSubmit, newEntry, setNewEntry, url }) {

    const [cowData, setCowData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        setNewEntry({});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data based on tab
                const response = await axios.get(`${url}cow`);
                setCowData(response.data);

            } catch (error) {
                console.error(`Error fetching cow data:`, error);
            }
        };

        fetchData();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Medical Exams Information</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <FormControl mb={4}>
                            <FormLabel>Disease</FormLabel>
                            <Input
                                type="text"
                                placeholder="Disease"
                                value={newEntry.Disease || ''}
                                isRequired
                                onChange={e => setNewEntry({ ...newEntry, Disease: e.target.value })}
                            />
                            <FormLabel mt={2}>Cow ID</FormLabel>
                            <Select
                                value={newEntry.CowID || ''}
                                onChange={e => setNewEntry({ ...newEntry, CowID: Number(e.target.value) })}
                                isRequired>
                                <option value="">Select Cow ID</option>
                                {cowData.map(cow => <option key={generateUniqueId()} value={cow.CowID}>{`cow ${cow.CowID}`}</option>)}
                            </Select>
                            <FormLabel mt={2}>Exam Date</FormLabel>
                            <Input
                                type="date"
                                value={newEntry.ExamDate || ''}
                                isRequired
                                onChange={e => setNewEntry({ ...newEntry, ExamDate: e.target.value })}
                            />
                            <FormLabel mt={2}>Result</FormLabel>
                            <Select
                                value={newEntry.Result || ''}
                                onChange={e => setNewEntry({ ...newEntry, Result: e.target.value })}
                                isRequired>
                                <option value="">Select Result</option>
                                <option value="Healthy">Healthy</option>
                                <option value="Sick">Sick</option>
                            </Select>
                            <Button mt={4} colorScheme="teal" type="submit">Update </Button>
                            <Button mt={4} ml={5} variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        </FormControl>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


