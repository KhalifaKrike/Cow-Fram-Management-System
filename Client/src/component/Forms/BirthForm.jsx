
import { Select, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import generateUniqueId from '../generateUniqueId';
import axios from 'axios';


function BirthForm({ setNewEntry, newEntry, selectedTab, sendData, url }) {
    const selectRef = useRef(null);
    
    const [cowData, setCowData] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        selectRef.current.value = '';
        sendData();
        setNewEntry({});
    }
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
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl mb={4}>
                    <FormLabel mt={2}>Mother ID</FormLabel>
                    <Select
                        ref={selectRef}
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
                    <Button mt={4} colorScheme="teal" type="submit">Add {selectedTab.slice(0, 1).toUpperCase() + selectedTab.slice(1)}</Button>
                </FormControl>
            </form>
        </>
    );
}
//
export default BirthForm;
