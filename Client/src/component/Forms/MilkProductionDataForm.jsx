
import { Select, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import generateUniqueId from '../generateUniqueId';
import axios from 'axios';


function MilkProductionDataForm({ setNewEntry, newEntry, selectedTab, sendData, url }) {
    const CowIDSelectRef = useRef(null);
    
    const [cowData, setCowData] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        CowIDSelectRef.current.value = '';
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
                <FormLabel mt={2}>Cow ID</FormLabel>
                    <Select
                        ref={CowIDSelectRef}
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
                    
                    <Button mt={4} colorScheme="teal" type="submit">Add {selectedTab.slice(0, 1).toUpperCase() + selectedTab.slice(1)}</Button>
                </FormControl>
            </form>
        </>
    );
}
//
export default MilkProductionDataForm;
