import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import generateUniqueId from '../generateUniqueId';


export default function UpdateFormModalBirths({ isOpen, setIsOpen, onSubmit, newEntry, setNewEntry, url }) {

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
                <ModalHeader>Update Birth Information</ModalHeader>
                <ModalBody>
                <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl mb={4}>
                    <FormLabel mt={2}>Mother ID</FormLabel>
                    <Select
                        value={newEntry.MotherCowID || ''}
                        onChange={e => setNewEntry({ ...newEntry, MotherCowID: Number(e.target.value) })}
                        isRequired>
                        <option value="">Select Mother ID</option>
                        {cowData.map(cow => <option key={generateUniqueId()} value={cow.CowID}>{`cow ${cow.CowID}`}</option>)}
                    </Select>

                    <FormLabel mt={2}>Birth Date</FormLabel>
                    <Input
                        type="date"
                        value={newEntry.BirthDate || ''}
                        isRequired
                        onChange={e => setNewEntry({ ...newEntry, BirthDate: e.target.value })}
                    />
                    <Button mt={4} colorScheme="teal" type="submit">Update</Button>
                    <Button mt={4} ml={5} variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                </FormControl>
            </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


