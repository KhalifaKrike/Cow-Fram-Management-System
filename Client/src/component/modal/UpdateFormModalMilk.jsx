import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import generateUniqueId from '../generateUniqueId';


export default function UpdateFormModalMilk({ isOpen, setIsOpen, onSubmit, newEntry, setNewEntry, url }) {

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
                <ModalHeader>Update Milk Production Information</ModalHeader>
                <ModalBody>
                <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl mb={4}>
                <FormLabel mt={2}>Cow ID</FormLabel>
                    <Select
                        value={newEntry.CowID || ''}
                        onChange={e => setNewEntry({ ...newEntry, CowID: Number(e.target.value) })}
                        isRequired>
                        <option value="">Select Cow ID</option>
                        {cowData.map(cow => <option key={generateUniqueId()} value={cow.CowID}>{`cow ${cow.CowID}`}</option>)}
                    </Select>
                    <FormLabel mt={2}>Production Date</FormLabel>
                    <Input
                        type="date"
                        value={newEntry.ProductionDate || ''}
                        isRequired
                        onChange={e => setNewEntry({ ...newEntry, ProductionDate: e.target.value })}
                    />

                    <FormLabel>Milk Quantity (in Litre)</FormLabel>
                    <Input
                        type="text"
                        placeholder="MilkQuantity"
                        value={newEntry.MilkQuantity || ''}
                        isRequired
                        onChange={e => setNewEntry({ ...newEntry, MilkQuantity: Number(e.target.value) })}
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


