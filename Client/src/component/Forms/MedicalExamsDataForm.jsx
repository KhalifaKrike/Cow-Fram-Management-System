
import { Select, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import generateUniqueId from '../generateUniqueId';
import axios from 'axios';


function MedicalExamsDataForm({ setNewEntry, newEntry, selectedTab, sendData, url }) {
    const CowIDSelectRef = useRef(null);
    const ResultSelectRef = useRef(null);
    const [cowData, setCowData] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        CowIDSelectRef.current.value = '';
        ResultSelectRef.current.value = '';
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
                        ref={CowIDSelectRef}
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
                        ref={ResultSelectRef}
                        value={newEntry.Result || ''}
                        onChange={e => setNewEntry({ ...newEntry, Result: e.target.value })}
                        isRequired>
                        <option value="">Select Result</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Sick">Sick</option>
                    </Select>
                    <Button mt={4} colorScheme="teal" type="submit">Add {selectedTab.slice(0, 1).toUpperCase() + selectedTab.slice(1)}</Button>
                </FormControl>
            </form>
        </>
    );
}
//
export default MedicalExamsDataForm;
