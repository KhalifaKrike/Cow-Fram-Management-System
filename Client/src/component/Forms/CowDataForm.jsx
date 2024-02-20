
import { Select, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRef } from 'react';



function CowDataForm({ setNewEntry, newEntry, selectedTab, sendData }) {
    const selectRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        selectRef.current.value = '';
        sendData();
        setNewEntry({});
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                        ref={selectRef}
                        onChange={e => setNewEntry({ ...newEntry, Breed: e.target.value })}
                        isRequired>
                        <option value="">Select Breed</option>
                        <option value="Montbéliarde">Montbéliarde</option>
                        <option value="Holstein">Holstein</option>
                    </Select>
                    <Button mt={4} colorScheme="teal" type="submit">Add {selectedTab.slice(0, 1).toUpperCase() + selectedTab.slice(1)}</Button>
                </FormControl>
            </form>
        </>
    );
}
//
export default CowDataForm;
